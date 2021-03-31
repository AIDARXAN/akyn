from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

IMAGE_ALLOWED_EXTENSIONS = ['png', 'gif', 'jpeg', 'jpg']


def name_file(instance, filename):
    return '/'.join(['avatars', filename])


class User(AbstractUser):
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
    token = models.CharField(null=True, blank=True, max_length=255)
    USERNAME_FIELD = "username"

    class Meta:
        db_table = 'api.users'
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
        db_table = 'api.follows'
        verbose_name = _('Follow')
        verbose_name_plural = _('Follows')
        ordering = ['follow_creation_date']
