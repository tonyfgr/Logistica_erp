from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

# Proveedores
urlpatterns = [
    path('', TrabajadorView.as_view()),
    path('<int:id>/', TrabajadorViewDetalle.as_view()),

]