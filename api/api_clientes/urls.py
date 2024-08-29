from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('per/', views.ClientePersonaView.as_view()),
    path('emp/', views.ClienteEmpresaView.as_view()), 
    path('mod/per/<int:id>', views.ClientePersonaViewDetalle.as_view()),
    path('mod/emp/<int:id>', views.ClienteEmpresaViewDetalle.as_view()),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)