from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', ComprasView.as_view()),
    path('<int:id>/', ComprasDetailView.as_view()),

    path('remisiones/', RemisionesView.as_view()),
    path('remisiones/<int:id>/', RemisionDetailView.as_view()),
    path('remisiones_detalles/<int:id>/', RemisionDetalleDetailView.as_view()),
    path('entrada_almacen/<int:id>/', EntradasAlmacenComprasSerializer.as_view()),
]