from django.urls import path

from api.views import CustomRegisterView, ProfileView

urlpatterns = [
    path('registration/', CustomRegisterView.as_view(), name='custom_rest_register'),
    path('users/current', ProfileView.as_view(), name='user_profile')
]
