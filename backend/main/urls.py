from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication


schema_view = get_schema_view(
    openapi.Info(
        title="Akyn API",
        default_version='v1',
        description="API Documentation for Akyn",
    ),
    public=True,
    authentication_classes=(BasicAuthentication, TokenAuthentication)
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    path('api/v1/', include('api.urls')),
    path('allauth/', include('allauth.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
