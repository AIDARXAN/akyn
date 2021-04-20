from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import gettext_lazy as _
from django.db import IntegrityError
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_auth.registration.views import RegisterView
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from api.choices import PUBLISHED
from api.drf_yasg_responses import success_response_ok, bad_request_response, not_found_response, created_response, no_content_response
from api.models import User, Publication, Follow, Comment
from api.serializers import RegisterSerializer, UserSerializer, ImageSerializer, ProfileThirdUserSerializer, \
    PublicationSerializer, PublicationEditSerializer, UserFollowersListSerializer, CommentSerializer, \
    CommentPostSerializer, UserInfoSerializer, EditUserSerializer, ChangePasswordSerializer


class CustomRegisterView(RegisterView):
    successfully_create_response = openapi.Response(
        description="Registration",
        schema=RegisterSerializer(help_text='custom register serializer'),
    )

    @swagger_auto_schema(
        operation_description="Creates new user in database",
        request_body=RegisterSerializer(help_text='custom register serializer'),
        responses={
            status.HTTP_201_CREATED: successfully_create_response
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(self.get_response_data(user),
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class AvatarViewSet(APIView):
    """
     An endpoint for editing user avatar
    """
    serializer = ImageSerializer
    parser_classes = (FormParser, MultiPartParser)

    @swagger_auto_schema(
        operation_description="An endpoint for editing user avatar",
        request_body=serializer,
        responses={status.HTTP_200_OK: success_response_ok(serializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def patch(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update(request.user, serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class ProfileView(APIView):
    serializer = UserSerializer

    @swagger_auto_schema(
        operation_description="Get users current profile",

        responses={status.HTTP_200_OK: success_response_ok(serializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def get(self, request):
        user = get_object_or_404(User, pk=request.user.pk)
        serializer = self.serializer(user, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Updates users profile data",
        request_body=serializer,
        responses={status.HTTP_200_OK: success_response_ok(serializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def put(self, request):
        user = get_object_or_404(User, pk=request.user.pk)
        serializer = EditUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        user.update_profile(validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Deletes user profile and all publications, comments with it",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request):
        user = get_object_or_404(User, pk=request.user.pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileViewForThirdUser(APIView):
    serializer = ProfileThirdUserSerializer

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = self.serializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class PublicationView(APIView):
    serializer = PublicationEditSerializer

    @swagger_auto_schema(
        operation_description="Deletes user profile and all publications, comments with it",
        request_body=serializer,
        responses={status.HTTP_201_CREATED: created_response,
                   status.HTTP_400_BAD_REQUEST: bad_request_response},
    )
    def post(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Publication.objects.create(user=request.user, **request.data)
        return Response(status=status.HTTP_201_CREATED)


class PublicationDetailView(APIView):
    serializer = PublicationSerializer

    @swagger_auto_schema(
        operation_description="Returns one publication",
        responses={status.HTTP_200_OK: success_response_ok(serializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def get(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk)
        serializer = self.serializer(publication, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="update publication",
        request_body=serializer,
        responses={status.HTTP_200_OK: success_response_ok(PublicationEditSerializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def put(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk, user=request.user)
        serializer = PublicationEditSerializer(data=request.data)
        serializer.is_valid()
        validated_data = serializer.validated_data
        publication.update_publication(validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="delete publication from database permanently",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk, user=request.user)
        publication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PublicationLikeView(APIView):

    @swagger_auto_schema(
        operation_description="Add like to the post",
        responses={status.HTTP_201_CREATED: created_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def post(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk)
        publication.likes.add(request.user)
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Remove like from the post",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk)
        publication.likes.remove(request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserSubscribeView(APIView):

    @swagger_auto_schema(
        operation_description="Subscribe on user",
        responses={status.HTTP_201_CREATED: created_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def post(self, request, username):
        user = get_object_or_404(User, username=username)
        Follow.objects.get_or_create(user=user, subscriber=request.user)
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Unsubscribe",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request, username):
        user = get_object_or_404(User, username=username)
        follow = get_object_or_404(Follow, user=user, subscriber=request.user)
        follow.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserFollowersListView(APIView):
    serializer = UserFollowersListSerializer

    @swagger_auto_schema(
        operation_description="Get users followers",
        responses={status.HTTP_200_OK: success_response_ok(serializer)}
    )
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        users = user.followers.all()
        serializer = self.serializer(users, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserFollowsListView(APIView):
    serializer = UserFollowersListSerializer

    @swagger_auto_schema(
        operation_description="Get users follows",
        responses={status.HTTP_200_OK: success_response_ok(serializer)}
    )
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        follows = Follow.objects.filter(subscriber__pk=user.pk).values_list('user__pk', flat=True)
        users = User.objects.filter(pk__in=follows)
        serializer = self.serializer(users, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentsView(APIView):
    serializer = CommentSerializer

    @swagger_auto_schema(
        operation_description="Get comments list of publication",
        responses={status.HTTP_200_OK: success_response_ok(serializer)}
    )
    def get(self, request, publication_pk):
        comments = Comment.objects.filter(publication__pk=publication_pk)
        serializer = self.serializer(comments, many=True, context={'user': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create comment under the post",
        request_body=CommentPostSerializer,
        responses={status.HTTP_201_CREATED: created_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def post(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk)
        serializer = CommentPostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Comment.objects.create(user=request.user, publication=publication, description=serializer.data.get('description'))
        return Response(status=status.HTTP_201_CREATED)


class CommentsDetailView(APIView):
    serializer = CommentPostSerializer

    @swagger_auto_schema(
        operation_description="Update comment",
        request_body=serializer,
        responses={status.HTTP_200_OK: success_response_ok(PublicationEditSerializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def put(self, request, comment_pk):
        comment = get_object_or_404(Comment, pk=comment_pk, user=request.user)
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment.update_comment(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Unsubscribe",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request, comment_pk):
        comment = get_object_or_404(Comment, pk=comment_pk, user=request.user)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserSearchView(APIView):
    serializer = UserInfoSerializer

    @swagger_auto_schema(
        operation_description="Get users list search",
        responses={status.HTTP_200_OK: success_response_ok(serializer)}
    )
    def get(self, request, search):
        if len(search) > 1:
            users = User.objects.filter(
                Q(username__contains=search) |
                Q(first_name__contains=search) |
                Q(last_name__contains=search)
            )
            serializer = self.serializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FeedView(APIView):
    serializer = PublicationSerializer

    @swagger_auto_schema(
        operation_description="Get user subscribed publications",
        responses={status.HTTP_200_OK: success_response_ok(serializer)}
    )
    def get(self, request):
        follows = Follow.objects.filter(subscriber__pk=request.user.pk).values_list('user__pk', flat=True)
        publications = Publication.objects.filter(user__pk__in=follows, status=PUBLISHED)
        serializer = self.serializer(publications, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdatePassword(APIView):
    """
    An endpoint for changing password.
    """
    new_password1 = openapi.Parameter('new_password1', openapi.IN_QUERY, description='Enter a new password',
                                      type=openapi.TYPE_STRING, )
    new_password2 = openapi.Parameter('new_password2', openapi.IN_QUERY, description='Confirm new password',
                                      type=openapi.TYPE_STRING, )
    old_password = openapi.Parameter('old_password', openapi.IN_QUERY, description='Enter a old password',
                                     type=openapi.TYPE_STRING, )
    user_id = openapi.Parameter('user_id', openapi.IN_QUERY, description='User primary key required',
                                type=openapi.TYPE_STRING)

    no_content = openapi.Response(description="No_content")
    bed_request = openapi.Response(description='No_content')
    not_found = openapi.Response(description='Not Found')
    forbidden = openapi.Response(description='You don\'t have access')

    @swagger_auto_schema(
        operation_description="An endpoint for changing password.",
        responses={status.HTTP_204_NO_CONTENT: no_content,
                   status.HTTP_400_BAD_REQUEST: bed_request,
                   status.HTTP_404_NOT_FOUND: not_found,
                   status.HTTP_403_FORBIDDEN: forbidden},
        manual_parameters=[new_password1, new_password2, old_password, user_id]
    )
    def put(self, request, *args, **kwargs):
        try:
            self.object = User.objects.get(pk=request.user.pk)
        except ObjectDoesNotExist:
            return Response(_("Not found"), status=status.HTTP_404_NOT_FOUND)
        serializer = ChangePasswordSerializer(data=request.data, context={'user': self.object, 'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)