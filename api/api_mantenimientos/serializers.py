from rest_framework import serializers

from api_models.models import (
    Formapago, Provincias, 
    Entidades, Impuestos, 
    Embalajes, Categoria, 
    Almacen, Areas, Unidad, Categoria_producto)

class ProviciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincias
        fields = ['id', 'nombreprovincia']

class EntidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entidades
        fields = ['id', 'nombreentidad']

class ImpuestosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impuestos
        fields = ['id', 'nombre', 'valor']

class EmbalajesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Embalajes
        fields = ['id', 'nombre']

class FormapagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formapago
        fields = ['id', 'nombrefp']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class AlmacenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Almacen
        fields = ['id', 'nombre', 'descripcion', 'ubicacion', 'abreviacion']

class AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Areas
        fields = ['id', 'nombre','abreviacion']

class UnidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad
        fields = ['id', 'nombre','valor']

class Categoria_productoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria_producto
        fields = ['id', 'nombre']
