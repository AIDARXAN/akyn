from django.shortcuts import render

# Create your views here.
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_auth.registration.views import RegisterView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import RegisterSerializer, UserSerializer


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


class ProfileView(APIView):
    serializer = UserSerializer

    def get(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
