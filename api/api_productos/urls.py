from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.ProductoView.as_view()),
    path('<int:id>/', views.ProductoDetailView.as_view()),
    path('variantes/', views.Producto_varianteView.as_view()),
    path('variantes/<int:id>/', views.Producto_varianteDetailView.as_view()),
    path('detalles/', views.Producto_detallelView.as_view()),
    path('detalles/<int:id>/', views.Producto_detalleDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)