from rest_framework import serializers
from api_models.models import Producto, ProduccionProducto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion_producto', 'categoria', 'imagen', 'borrado']

class ProduccionProductoSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.CharField(source='id_producto.nombre', read_only=True)
    class Meta:
        model = ProduccionProducto
        fields = ['id', 'fecha_inicio', 'fecha_fin', 'estado', 'id_producto', 'nombre_producto', 'cantidad']