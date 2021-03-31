from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.models import TokenModel
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer, TokenSerializer
from rest_framework import serializers

from api.models import User


# class CustomLoginSerializer(LoginSerializer):
#     class Meta:
#         fields = ['username', 'password']


class RegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(max_length=12, write_only=True)
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
            'last_name': self.validated_data.get('last_name', ''),
            'phone': self.validated_data.get('phone', ''),
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name',
            'last_name', 'phone', 'is_active',
            'avatar', 'birth_date', 'groups', 'is_superuser',
        ]


class TokenSerializer(TokenSerializer):
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = ['key', 'user']