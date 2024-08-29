from rest_framework import serializers
from api_models.models import Producto, KardexProducto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion_producto', 'categoria', 'imagen', 'borrado']

class KardexProductoSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.CharField(source='producto.nombre', read_only=True)
    class Meta:
        model = KardexProducto
        fields = ['id', 'producto', 'accion', 'cantidad', 'saldo', 'created_at', 'produccion','nombre_producto','motivo']
