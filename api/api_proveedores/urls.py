from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

# Proveedores
urlpatterns = [
    path('per', ProveedorPersonaView.as_view()),
    path('emp', ProveedorEmpresaView.as_view()), 
    path('per/<int:id>', ProveedorPersonaViewDetalle.as_view()),
    path('emp/<int:id>', ProveedorEmpresaViewDetalle.as_view()),
]
