from django.urls import path
from . import views

urlpatterns = [
    path('crear_produccion_producto/', views.crear_produccion_producto),
    path('produccion_producto/', views.obtener_produccion_producto),
    path('produccion_producto/<int:pk>/', views.actualizar_produccion_producto),  
    path('produccion_producto/<int:pk>/completar/', views.completar_produccion),
]
