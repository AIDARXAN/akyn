from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from users_api.managers import CustomUserManager

IMAGE_ALLOWED_EXTENSIONS = ['png', 'gif', 'jpeg', 'jpg']


def name_file(instance, filename):
    return '/'.join(['avatars', filename])


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, db_index=True, max_length=255)
    phone = models.CharField(unique=True, max_length=54)
    birth_date = models.DateField(blank=True, null=True)
    registration_date = models.DateField(auto_now_add=True)
    avatar = models.ImageField(
        upload_to=name_file,
        blank=True,
        null=True,
        validators=[FileExtensionValidator(
            allowed_extensions=IMAGE_ALLOWED_EXTENSIONS,
            message=_('Формат картинки должен быть только: {}'
                      .format(IMAGE_ALLOWED_EXTENSIONS))
            )
        ]
    )
    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'users_api.users'
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['first_name']


class Follow(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user'
    )
    follow_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='follow_user'
    )
    follow_creation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users_api.follows'
        verbose_name = _('Follow')
        verbose_name_plural = _('Follows')
        ordering = ['follow_creation_date']
