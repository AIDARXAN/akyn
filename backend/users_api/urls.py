from django.urls import path

from users_api.views import CustomRegisterView

urlpatterns = [
    path('registration/', CustomRegisterView.as_view(), name='custom_rest_register'),
]
