from django.urls import path
from .views import *

urlpatterns = [
    path('', RequerimientoView.as_view()),
    # path('servicio/', RequerimientoServicioView.as_view()),

    path('<int:id>/', RequerimientoDetailView.as_view()),
    # path('servicio/<int:id>/', RequerimientoServicioDetailView.as_view()),
]