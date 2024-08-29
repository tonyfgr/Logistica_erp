from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', CajaDiariaView.as_view()),
    path('<int:id>/', CajaDiariaDetailView.as_view()),

    path('ultimacaja/', UltimaCajaView.as_view()),

    path('ultimacaja/<str:tipo>/', CajaCompraVentaView.as_view()),

    path('ingresosventas/', IngresoVentaView.as_view()),
    path('ingresosotros/', IngresosOtrosView.as_view()),

    path('egresoscompra/', EgresosCompraView.as_view()),
    path('egresosotros/', EgresosOtrosView.as_view()),

    path('cambio-dolar/', tipo_cambio_dolar_view),

]