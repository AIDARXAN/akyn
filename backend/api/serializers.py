from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.conf import settings
from django.contrib.auth import password_validation
from django.shortcuts import get_object_or_404
from rest_auth.models import TokenModel
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer, TokenSerializer as BuiltInTokenSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from api.models import User, Publication, Follow, Comment


class CustomLoginSerializer(LoginSerializer):
    class Meta:
        fields = ['username', 'password']


class RegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=255, write_only=True)
    last_name = serializers.CharField(max_length=255, write_only=True)

    def validate_phone(self, value):
        return get_adapter().clean_phone(value)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        return user

    class Meta:
        ref_name = 'custom register serializer'


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name',
            'last_name', 'avatar'
        ]


class PublicationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ['description', 'status']


class PublicationSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    creation_date = serializers.DateTimeField(read_only=True)
    user = UserInfoSerializer(read_only=True, allow_null=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    def get_is_liked(self, obj):
        request = self.context.get('request')
        is_liked = Publication.objects.filter(pk=obj.pk, likes=request.user.pk).exists()
        return is_liked

    def get_likes(self, obj):
        likes_count = obj.likes.all().count()
        return likes_count

    class Meta:
        model = Publication
        fields = ['id', 'likes', 'description', 'creation_date', 'status', 'user', 'is_liked']


class UserSerializer(serializers.ModelSerializer):
    publications = PublicationSerializer(many=True)
    followers = serializers.SerializerMethodField()
    follows = serializers.SerializerMethodField()

    def get_followers(self, obj):
        followers_count = Follow.objects.filter(user__pk=obj.pk).count()
        return followers_count

    def get_follows(self, obj):
        follows_count = Follow.objects.filter(subscriber__pk=obj.pk).count()
        return follows_count

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name',
            'last_name', 'email',
            'avatar', 'registration_date', 'publications',
            'followers', 'follows'
        ]


class ProfileThirdUserSerializer(serializers.ModelSerializer):
    publications = PublicationSerializer(many=True)
    followers = serializers.SerializerMethodField()
    follows = serializers.SerializerMethodField()
    is_subscribed = serializers.SerializerMethodField()

    def get_is_subscribed(self, obj):
        request = self.context.get('request')
        is_following = Follow.objects.filter(user__pk=obj.pk, subscriber__pk=request.user.pk).exists()
        return is_following

    def get_followers(self, obj):
        followers_count = Follow.objects.filter(user__pk=obj.pk).count()
        return followers_count

    def get_follows(self, obj):
        follows_count = Follow.objects.filter(subscriber__pk=obj.pk).count()
        return follows_count

    class Meta:
        model = User
        fields = [
            'username', 'first_name',
            'last_name',
            'avatar', 'publications',
            'followers', 'follows', 'is_subscribed'
        ]


class TokenSerializer(BuiltInTokenSerializer):
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = ['key', 'user']


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
       Serializer for requesting a password reset e-mail.
       """
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    password = None

    def validate(self, data):
        password1 = data.get('new_password1')
        password2 = data.get('new_password2')
        if password1 and password2:
            if password1 != password2:
                raise ValidationError(
                    self.error_messages['password_mismatch'],
                    code='password_mismatch',
                )
        password_validation.validate_password(password2, self.context.get('user'))
        self.password = password2
        return password2

    def save(self):
        self.user = self.context.get('user')
        self.user.set_password(self.password)
        self.user.save()
        return self.user


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar']

    def validate_avatar(self, avatar):
        if avatar.size > settings.TEN_MEGABYTES_IN_BYTES:
            raise serializers.ValidationError(_("File size of avatar is bigger than 10MB"))
        if avatar.content_type not in settings.IMAGE_CONTENT_TYPES:
            raise serializers.ValidationError(_("Avatar content type is not allowed."))
        return avatar

    def update(self, instance, validated_data):
        instance.avatar.delete()
        instance.avatar = validated_data.get('avatar')
        instance.save()
        return instance


class UserFollowersListSerializer(serializers.ModelSerializer):
    is_subscribed = serializers.SerializerMethodField()

    def get_is_subscribed(self, obj):
        request = self.context.get('request')
        is_following = Follow.objects.filter(user__pk=obj.pk, subscriber__pk=request.user.pk).exists()
        return is_following

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name',
            'last_name', 'avatar', 'is_subscribed'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    changed = serializers.BooleanField(read_only=True)
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        user = self.context.get('user')
        if obj.user == user:
            return True
        return False

    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'description', 'created_at', 'changed', 'is_owner'
        ]


class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id', 'description'
        ]