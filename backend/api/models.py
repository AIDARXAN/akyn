from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from api.choices import PUBLICATION_TYPE, PUBLISHED

IMAGE_ALLOWED_EXTENSIONS = ['png', 'gif', 'jpeg', 'jpg']


def name_file(instance, filename):
    return '/'.join(['avatars', filename])


class User(AbstractUser):
    email = models.EmailField(unique=True, db_index=True, max_length=255)
    birth_date = models.DateField(blank=True, null=True)
    registration_date = models.DateField(auto_now_add=True)
    followers = models.ManyToManyField('self', through='Follow')
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

    def update_profile(self, data):
        self.username = data.get('username')
        self.email = data.get('email')
        self.first_name = data.get('first_name')
        self.last_name = data.get('last_name')
        self.birth_date = data.get('birthdate')
        self.save()


class Follow(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='follow_user'
    )
    subscriber = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='subscriber_user'
    )
    follow_creation_date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'subscriber']
        db_table = 'api.follows'
        verbose_name = _('Follow')
        verbose_name_plural = _('Follows')
        ordering = ['follow_creation_date']


class Publication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='publications')
    likes = models.ManyToManyField(User, blank=True)
    description = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    status = models.PositiveSmallIntegerField(choices=PUBLICATION_TYPE, null=False, default=PUBLISHED)

    class Meta:
        db_table = 'api.publications'
        verbose_name = _('Publication')
        verbose_name_plural = _('Publications')
        ordering = ['-creation_date']

    def update_publication(self, data):
        self.description = data.get('description')
        self.status = data.get('status')
        self.save()
