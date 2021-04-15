from django.urls import path

from api.api_views.password_reset import PasswordResetView, PasswordResetConfirmView
from api.views import CustomRegisterView, ProfileView, ProfileViewForThirdUser, PublicationDetailView, PublicationView, \
    PublicationLikeView, UserSubscribeView, UserFollowersListView, UserFollowsListView, CommentsView, \
    CommentsDetailView, UserSearchView, FeedView, AvatarViewSet, UpdatePassword

urlpatterns = [
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_rest_register'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='custom_password_rest_reset'),
    path(
        'auth/password/reset/confirm/<str:reset_token>/',
        PasswordResetConfirmView.as_view(),
        name='custom_password_rest_reset_confirm'
    ),
    path('users/avatar/', AvatarViewSet.as_view(), name='edit_avatar'),
    path('users/current/', ProfileView.as_view(), name='user_profile'),
    path('users/current/change-password/', UpdatePassword.as_view(), name='change-current-user-password'),
    path('users/<str:username>/', ProfileViewForThirdUser.as_view(), name='profile_view_for_third_party'),
    path('users/<str:username>/subscribe/', UserSubscribeView.as_view(), name='subscribe_user'),
    path('users/<str:username>/followers/', UserFollowersListView.as_view(), name='followers_list'),
    path('users/<str:username>/follows/', UserFollowsListView.as_view(), name='follows_list'),

    path('publications/', PublicationView.as_view(), name='publications'),
    path('publications/<int:publication_pk>/', PublicationDetailView.as_view(), name='publication_detail'),
    path('publications/<int:publication_pk>/like', PublicationLikeView.as_view(), name='like_publication'),
    path('publications/<int:publication_pk>/comments/', CommentsView.as_view(), name='publication_comments'),

    path('comments/<int:comment_pk>/', CommentsDetailView.as_view(), name='comment_detail'),

    path('users/search/<str:search>/', UserSearchView.as_view(), name='user_search'),

    path('feed/', FeedView.as_view(), name='feed')
]
