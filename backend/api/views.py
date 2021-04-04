from django.shortcuts import render, get_object_or_404

# Create your views here.
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_auth.registration.views import RegisterView
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from api.drf_yasg_responses import success_response_ok, bad_request, not_found
from api.models import User
from api.serializers import RegisterSerializer, UserSerializer, ImageSerializer, ProfileThirdUserSerializer


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
        responses={status.HTTP_200_OK: success_response_ok,
                   status.HTTP_400_BAD_REQUEST: bad_request,
                   status.HTTP_404_NOT_FOUND: not_found},
    )
    def put(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer = serializer.update(request.user, serializer.validated_data)
        serializer = UserSerializer(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileView(APIView):
    serializer = UserSerializer
    success_response = openapi.Response(
        description="Success",
        schema=serializer
    )

    @swagger_auto_schema(
        operation_description="Get users current profile",

        responses={status.HTTP_200_OK: success_response,
                   status.HTTP_400_BAD_REQUEST: bad_request,
                   status.HTTP_404_NOT_FOUND: not_found},
    )
    def get(self, request):
        user = get_object_or_404(User, pk=request.user.pk)
        serializer = self.serializer(user)
        return Response(serializer.data, status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Updates users profile data",
        request_body=serializer,
        responses={status.HTTP_200_OK: success_response,
                   status.HTTP_400_BAD_REQUEST: bad_request,
                   status.HTTP_404_NOT_FOUND: not_found},
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
        responses={status.HTTP_204_NO_CONTENT: success_response,
                   status.HTTP_404_NOT_FOUND: not_found},
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


