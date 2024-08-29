from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', ArticulosView.as_view()),
    path('<int:id>/', ArticuloDetailView.as_view()),
    path('variantes/', ArticuloVarianteView.as_view()),
    path('variantes/<int:id>/', ArticuloVarianteDetailView.as_view()),

]
