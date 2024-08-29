from django.shortcuts import render

from api_models.models import (
    Formapago, 
    Provincias, 
    Entidades, 
    Impuestos, 
    Embalajes, 
    Categoria,
    Almacen
)
from api_mantenimientos.serializers import *
from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ProvinciasViewSet(viewsets.ModelViewSet):
    queryset = Provincias.objects.all().order_by('nombreprovincia')
    serializer_class = ProviciasSerializer

class EntidadesViewSet(viewsets.ModelViewSet):
    queryset = Entidades.objects.all()
    serializer_class = EntidadesSerializer

class ImpuestosViewSet(viewsets.ModelViewSet):
    queryset = Impuestos.objects.all()
    serializer_class = ImpuestosSerializer

class EmbalajesViewSet(viewsets.ModelViewSet):
    queryset = Embalajes.objects.all()
    serializer_class = EmbalajesSerializer

class FormaPagoViewSet(viewsets.ModelViewSet):
    queryset = Formapago.objects.all()
    serializer_class = FormapagoSerializer
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class AlmacenViewSet(viewsets.ModelViewSet):
    queryset = Almacen.objects.all()
    serializer_class = AlmacenSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Areas.objects.all()
    serializer_class = AreasSerializer

class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = AreasSerializer

class Categoria_productosViewSet(viewsets.ModelViewSet):
    queryset = Categoria_producto.objects.all()
    serializer_class = Categoria_productoSerializer
