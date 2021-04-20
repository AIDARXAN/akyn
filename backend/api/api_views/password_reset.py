from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import get_template
from django.utils.html import strip_tags
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_auth.serializers import PasswordResetSerializer
from rest_auth.views import PasswordResetView, PasswordResetConfirmView
from rest_framework import status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _
from api.models import User
from api.serializers import PasswordResetConfirmSerializer
from services.mail_sender import MailSender


class PasswordResetView(PasswordResetView):
    successful_response = openapi.Response(
        description="Password reset e-mail has been sent.",
        schema=PasswordResetSerializer,
    )
    not_found_message = openapi.Response(
        description="Email not found.",
        schema=PasswordResetSerializer
    )

    @swagger_auto_schema(
        operation_description="Checks email in db, if email exists sends reset link to email",
        request_body=PasswordResetSerializer,
        responses={
            status.HTTP_200_OK: successful_response,
            status.HTTP_404_NOT_FOUND: not_found_message
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(email=serializer.data['email'])
            token = PasswordResetTokenGenerator().make_token(user)
            url = settings.ROOT_DOMAIN + "/" + settings.PASSWORD_RESET_URI + "/" + token
            template = get_template('password_reset.html')
            context = {'reset_url': url}
            html_message = template.render(context)
            plain_message = strip_tags(html_message)
            title = 'Reset Password Akyn'
            MailSender(plain_message, [user.email], title=title, html_text=html_message).send_alternative_email()
            user.token = token
            user.save()

            return Response(
                {"detail": _("Password reset e-mail has been sent.")},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"detail": _("Email not found.")},
                status=status.HTTP_404_NOT_FOUND
            )


class PasswordResetConfirmView(PasswordResetConfirmView):
    successful_response = openapi.Response(
        description="Password has been reset with the new password.",
        schema=PasswordResetConfirmSerializer,
    )

    @swagger_auto_schema(
        operation_description="Checks email in db, if email exists sends reset link to email",
        request_body=PasswordResetConfirmSerializer,
        responses={
            status.HTTP_200_OK: successful_response,
        }
    )
    def post(self, request, reset_token):
        user = User.objects.get(token=reset_token)
        serializer = PasswordResetConfirmSerializer(context={'user': user}, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except KeyError:
            return Response(
                {"detail": _("Passwords not equal.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if PasswordResetTokenGenerator().check_token(user, reset_token):
            serializer.save()
            return Response(
                {"detail": _("Password has been reset with the new password.")},
                status=status.HTTP_200_OK
            )
