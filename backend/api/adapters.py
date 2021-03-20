from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field
from api.models import User
from django.utils.translation import gettext as _
from rest_framework.exceptions import ValidationError


class CustomUserAccountAdapter(DefaultAccountAdapter):
    def clean_phone(self, value):
        user = User.objects.filter(phone=value)
        if user.exists():
            raise ValidationError(_('Phone number is already exists in the database, you need to provide another one'))
        return value

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, False)
        user_field(user, 'first_name', request.data.get('first_name', ''))
        user_field(user, 'last_name', request.data.get('last_name', ''))
        user_field(user, 'phone', request.data.get('phone', ''))
        if commit:
            user.save()

        return user