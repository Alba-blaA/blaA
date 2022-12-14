"""apiserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from apiserver.swagger import BothHttpAndHttpsSchemaGenerator

schema_view = get_schema_view(
   openapi.Info(
    title="blaA API",
    default_version='v1',
    description="BlaA API Test description",
    terms_of_service="https://www.google.com/policies/terms/",
    contact=openapi.Contact(email="contact@snippets.local"),
    license=openapi.License(name="BSD License"),
   ),
    public=True,
    generator_class=BothHttpAndHttpsSchemaGenerator,
    permission_classes=[permissions.AllowAny],
    authentication_classes=[],

)


urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path('api/v1/accounts/',include('accounts.urls')),
    path('api/v1/categorys/',include('categorys.urls')),
    path('api/v1/reviews/',include('reviews.urls')),
    path('api/v1/stories/',include('stories.urls')),
    # path('account/',include('accounts.urls')),
    path('api/v1/blacklist/', include('blacklists.urls')),
    path('api/v1/crews/',include('crews.urls')),
    path('api/v1/notifications/',include('notifications.urls')),
    #--------------------swagger--------------
    path('api/v1/swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # path('swagger(?P<format>\.json|\.yaml)$/', schema_view.without_ui(cache_timeout=0), name='swagger'),
    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/v1/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
