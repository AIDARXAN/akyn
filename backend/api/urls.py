from django.urls import path

from api.api_views.password_reset import PasswordResetView, PasswordResetConfirmView
from api.views import CustomRegisterView, ProfileView, ProfileViewForThirdUser

urlpatterns = [
    path('registration/', CustomRegisterView.as_view(), name='custom_rest_register'),
    path('users/current/', ProfileView.as_view(), name='user_profile'),
    path('password/reset/', PasswordResetView.as_view(), name='custom_password_rest_reset'),
    path('users/<str:username>/', ProfileViewForThirdUser.as_view(), name='profile_view_for_third_party'),
    path(
        'password/reset/confirm/<str:reset_token>/',
        PasswordResetConfirmView.as_view(),
        name='custom_password_rest_reset_confirm'
    ),
]
