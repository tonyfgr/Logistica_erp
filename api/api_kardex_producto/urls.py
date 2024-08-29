from django.urls import path
from . import views

urlpatterns = [
    path('realizar_accion/', views.realizar_accion),
    path('kardex_producto/<int:pk>/', views.obtener_kardex_producto),
    path('kardex_producto/', views.obtener_todos_kardex_producto),
]
