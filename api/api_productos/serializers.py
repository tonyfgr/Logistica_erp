from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer
from api_mantenimientos.serializers import AlmacenSerializer
from erp.utils import URLGENERAL
#Import Models
from api_models.models import (
    Producto, Producto_detalle, Articulo, ArticuloVariante, Producto_variante, Ubicacion_almacen_producto, Almacen
)
from api_articulos.serializers import *
#Import Serializer    


class Producto_detalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto_detalle
        fields = ['id', 'cantidad', 'articulo', 'precio', 'borrado']

    def to_representation(self, instance):
        print("articulo")
        print(instance.articulo.id)
        variantes = ArticuloVariante.objects.filter(id=instance.articulo.id)
        ser_variantes = ArticuloVarianteSerializer(variantes, many=True)
        return{
            'id':instance.id,
            'cantidad':instance.cantidad,
            'articulo':ser_variantes.data if instance.articulo else None,
            'precio':instance.precio,
            'borrado':instance.borrado,
        }    

class Ubicacion_almacenSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion_almacen_producto
        fields = ['id','almacen', 'cantidad']
    def to_representation(self, instance):
        almacen_info = ALSerilizer(Almacen.objects.get(id=instance.almacen.id)).data if instance.almacen else None
        return {
            "id":instance.id,
            "almacen": almacen_info,
            "cantidad": instance.cantidad
        }

class PVSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    ubicacion_producto = Ubicacion_almacenSerilizer(many=True)
    class Meta:
        model = Producto_variante
        fields = ['id', 'nombre','descripcion', 'ubicacion_producto', 'color', 'talla', 'costo_produccion', 'precio_venta', 'borrado', 'producto_detalle']
        depth = 4

class Producto_varianteSerializer(WritableNestedModelSerializer):
    producto_detalle = Producto_detalleSerializer(many=True)
    ubicacion_producto = Ubicacion_almacenSerilizer(many=True)
    class Meta:
        model = Producto_variante
        fields = "__all__"
    
    def to_representation(self, instance):
        detalle = Producto_detalle.objects.filter(variante=instance.id)
        ser_detalle = Producto_detalleSerializer(detalle, many=True)
        almacen = Ubicacion_almacen_producto.objects.filter(producto_variante=instance.id)
        ser_almacen = Ubicacion_almacenSerilizer(almacen, many=True)
        return{
            'id':instance.id,
            'nombre':instance.nombre,
            'descripcion':instance.descripcion,
            'ubicacion_producto':ser_almacen.data if instance.ubicacion_producto else None,
            'color':instance.color,
            'talla':instance.talla,
            'costo_produccion':instance.costo_produccion,
            'precio_venta':instance.precio_venta,
            'producto': instance.producto.nombre,
            'imagen': URLGENERAL+instance.producto.imagen.url,
            'producto_detalle' : ser_detalle.data,
            'producto_id':instance.producto.id
        }

# class ProductoSerializer(serializers.ModelSerializer):
class ProductoSerializer(WritableNestedModelSerializer):
    producto_variante = Producto_varianteSerializer(many=True)
    class Meta:
        model = Producto
        fields = ['id','codigo', 'nombre', 'descripcion_producto', 'categoria','imagen', 'borrado', 'producto_variante']

    def to_representation(self, instance):
        producto_variante = Producto_variante.objects.filter(producto=instance.id)
        ser_producto_variante = PVSerializer(producto_variante, many=True)
        if instance.categoria:
            categoria = Categoria_producto.objects.get(id=instance.categoria.id)
            ser_categoria = CatSerializer(categoria)
        return{
            'id': instance.id,
            'codigo':instance.codigo,
            'nombre' : instance.nombre,
            # 'cantidad' : instance.cantidad,
            'descripcion_producto' : instance.descripcion_producto,
            'nombre_categoria':instance.categoria.nombre if instance.categoria else None,
            'categoria' : ser_categoria.data if instance.categoria else None,
            'imagen' : URLGENERAL+instance.imagen.url,
            'borrado' : instance.borrado,
            'producto_variante': ser_producto_variante.data
        }


