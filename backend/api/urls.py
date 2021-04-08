from django.urls import path

from api.api_views.password_reset import PasswordResetView, PasswordResetConfirmView
from api.views import CustomRegisterView, ProfileView, ProfileViewForThirdUser, PublicationDetailView, PublicationView, \
    PublicationLikeView, UserSubscribeView

urlpatterns = [
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_rest_register'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='custom_password_rest_reset'),
    path(
        'auth/password/reset/confirm/<str:reset_token>/',
        PasswordResetConfirmView.as_view(),
        name='custom_password_rest_reset_confirm'
    ),

    path('users/current/', ProfileView.as_view(), name='user_profile'),
    path('users/<str:username>/', ProfileViewForThirdUser.as_view(), name='profile_view_for_third_party'),
    # path('users/search/<str:search>/'),

    path('publications/', PublicationView.as_view(), name='publications'),
    path('publications/<int:publication_pk>/', PublicationDetailView.as_view(), name='publication_detail'),
    path('publications/<int:publication_pk>/like', PublicationLikeView.as_view(), name='like_publication')

]
