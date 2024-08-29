from django.urls import path
from .views import *

urlpatterns = [
    #Bienes
    path('bien/', OrdenBienView.as_view()),
    path('bien/<int:id>/', OrdenBienDetailView.as_view()),
    path('biendocumentos/<int:id>/', PropuestaEmpresaBienDocumentosDetailView.as_view()),
    
    #Servicios
    path('servicio/', OrdenServicioView.as_view()),
    path('servicio/<int:id>/', OrdenServicioDetailView.as_view()),
    path('serviciodocumentos/<int:id>/', PropuestaEmpresaServicioDocumentosDetailView.as_view()),
    # path('servicio/', SolicitudBienView.as_view()),
    # path('servicio/<int:id>/', SolicitudBienView.as_view()),

]