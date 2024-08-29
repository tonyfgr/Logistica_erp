"""erp URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from api_models.views import export_csv 

urlpatterns = [
    path('api/', include('api_autenticacion_usuarios.urls')),
    path('admin/', admin.site.urls),
    # TEMPORAL
    path('export/', export_csv)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
