from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_auth.registration.views import RegisterView
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from api.drf_yasg_responses import success_response_ok, bad_request_response, not_found_response, created_response, no_content_response
from api.models import User, Publication
from api.serializers import RegisterSerializer, UserSerializer, ImageSerializer, ProfileThirdUserSerializer, \
    PublicationSerializer, PublicationEditSerializer


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
    def put(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer = serializer.update(request.user, serializer.validated_data)
        serializer = UserSerializer(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        serializer = self.serializer(user)
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
        serializer = self.serializer(data=request.data)
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
        serializer = self.serializer(user)
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
        operation_description="Get users current profile",
        responses={status.HTTP_200_OK: success_response_ok(serializer),
                   status.HTTP_400_BAD_REQUEST: bad_request_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def get(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk)
        serializer = self.serializer(publication)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Get users current profile",
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
        operation_description="Get users current profile",
        responses={status.HTTP_204_NO_CONTENT: no_content_response,
                   status.HTTP_404_NOT_FOUND: not_found_response},
    )
    def delete(self, request, publication_pk):
        publication = get_object_or_404(Publication, pk=publication_pk, user=request.user)
        publication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


