from django.urls import path, include

#Import de la vista para la autenticacion
from . views import *

#Import de todas las urls de las aplicaciones del proyecto
from api_mantenimientos.urls import *

urlpatterns = [
    #Autenticacion de usuario
    path('register/', RegisterAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('refresh/', RefreshAPIView.as_view()),

    #Cliente
    path('clientes/', include('api_clientes.urls')),

    #Proveedores
    path('proveedores/', include('api_proveedores.urls')),
    
    #Productos
    path('productos/', include('api_productos.urls')),

    #Mantenimiento
    path('mantenimientos/', include((router_mantenimiento, 'api_mantenimientos'))),

    #Articulos
    path('articulos/', include('api_articulos.urls')),

    #Compras
    path('compras/', include('api_compras.urls')),

    #Ventas
    path('ventas/', include('api_ventas.urls')),

    #Ordenes de bienes y servicios
    path('ordenes/', include('api_ordenes_bienes_servicios.urls')),

    #CajaDiaria
    path('cajadiaria/', include('api_cajadiaria.urls')),

    #Trabajadores
    path('trabajadores/', include('api_trabajadores.urls')),

    #Requerimientos
    path('requerimientos/', include('api_requerimientos.urls')),

    #Produccion
    path('produccion/', include('api_produccion_producto.urls')),

    #Produccion
    path('kardex/', include('api_kardex_producto.urls')),
]