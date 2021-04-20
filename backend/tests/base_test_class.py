import io
from datetime import datetime

from PIL import Image
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

from api.models import User


class BaseTestClass(APITestCase):
    """
    Base class to api tests
    You should use super().setUp() statement in start of your setUp method to right work of test class
    """

    def setUp(self):
        """
        setUp method needs to create database to specific test case
        You should use super().setUp() statement in start of your setUp method to right work of test class
        :return: None
        """
        self.client = APIClient()
        self.today = datetime.today()


    @staticmethod
    def add_user_to_group(user: User, group: Group) -> None:
        """
        Function to adding users to groups
        :param user: User which will be add to group
        :param group: Group in which user will be add
        :return: None
        """
        group.user_set.add(user)

    def login_user(self, user: User, group: Group = None, activate: bool = False) -> None:
        """
        Function to login users
        :param user: User which will be login
        :param group: Optional group in which user will be add after login
        :param activate: set activation=True if you want to activate user at current date
        :param additional_group: Optional argument which needs for adding additional group to user
        :param activate: Optional argument which needs for activate user
        :return: None
        """
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        if group is not None:
            self.add_user_to_group(user, group)

    def logout_user(self, user: User) -> None:
        """
        User logout
        :param user: User who will logout
        :return: None
        """
        Token.objects.filter(user=user).delete()
        self.client.credentials(HTTP_AUTHORIZATION='')

    @staticmethod
    def generate_photo_file() -> io.BytesIO:
        """
        Function to generate photo file
        :return: Random png photo
        """
        file = io.BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)
        return file

    @staticmethod
    def activate_user(user: User) -> None:
        """
        Use this function to activate user in your tests
        :param user: User which will be activate
        :return: None
        """
        user.is_active = True
        user.save()
