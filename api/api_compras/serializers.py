from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *
from api_articulos.serializers import AVSerializer,PVSerializer
from erp.utils import URLGENERAL

class CompraDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompraDetalle
        exclude = ('compra',)

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'
        depth = 2

class DetalleCompraSerializer(serializers.ModelSerializer):
    articulo = AVSerializer()
    class Meta:
        model = CompraDetalle
        fields = ['id', 'nombre_articulo', 'articulo', 'unidad', 'cantidad', 'precio_unitario', 'dscto_unitario', 'remision_hecha']
        depth = 2

class RemisionesDetalleCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemisionDetalleCompra
        fields = ['id', 'codigo','compra_detalle']

    def to_representation(self, instance):
        detalle_compra = CompraDetalle.objects.get(id=instance.compra_detalle.id)
        ser_detalle_compra = DetalleCompraSerializer(detalle_compra)
        return {
            'id': instance.id,
            'codigo': instance.codigo,
            'compra_detalle': ser_detalle_compra.data,
        }

class RemisionesCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemisionCompra
        fields = '__all__'

    def to_representation(self, instance):
        detalle_remision_compra = RemisionDetalleCompra.objects.filter(remision_compra=instance.pk)
        ser_detalle_remision_compra = RemisionesDetalleCompraSerializer(detalle_remision_compra, many=True)
        
        return {
            'id': instance.id,
            'codigo': instance.codigo,
            'fecha': instance.fecha,
            'trabajador': instance.trabajador.persona.nombre if instance.trabajador else None,
            'remision_compra_detalle': ser_detalle_remision_compra.data,
            'compra': instance.compra.id,
            'codigo_compra':instance.compra.codigo,
            'totalRemision':instance.totalRemision,
            'proveedor': instance.compra.nombre_proveedor,
            'numero_factura': instance.compra.numero_factura,
        }


class CompraSerializer(WritableNestedModelSerializer):
    detalle_compra = CompraDetalleSerializer(many=True)
    class Meta:
        model = Compra
        fields = ['id','fecha', 'orden_bien' , 'proveedor', 'estado', 'detalle_entrega', 'totalCompra', 'imagen_fac_compra', 'descuento', 'detalle_compra','numero_factura']
    
    def to_representation(self, instance):
        detalle_compra = CompraDetalle.objects.filter(compra=instance.pk)
        ser_detalle_compra = DetalleCompraSerializer(detalle_compra, many=True)
        proveedor_info = PVSerializer(Proveedores.objects.get(id=instance.proveedor.id)).data if instance.proveedor else None
        remision = RemisionCompra.objects.filter(compra=instance.pk)
        ser_remision = RemisionesCompraSerializer(remision, many=True) if remision else None

        return{
            'id': instance.id,
            'fecha':instance.fecha,
            'estado':instance.estado,
            'orden_bien': instance.orden_bien.codigo if instance.orden_bien else None,
            'estado_remision': instance.estado_remision,
            'numero_factura': instance.numero_factura,
            #All prov's information -> 'proveedor': ser_prov.data if instance.proveedor else None,
            #Just the name of the prov -> 'provedor': instance.nombre_proveedor,
            'proveedor': proveedor_info,
            'nombre_proveedor': instance.nombre_proveedor,
            'estado': instance.estado,
            'detalle_entrega': instance.detalle_entrega,
            'totalCompra': instance.totalCompra,
            'imagen_fac_compra': URLGENERAL + instance.imagen_fac_compra.url,
            'descuento': instance.descuento,
            'detalle_compra': ser_detalle_compra.data,  
            'codigo': instance.codigo,
            'borrado': instance.borrado,
            'remision': ser_remision.data if ser_remision else None
        }


class RemisionDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemisionDetalleCompra
        fields = '__all__'


class RemisionesSerializer(WritableNestedModelSerializer):
    remision_compra = RemisionDetalleSerializer(many=True)
    class Meta:
        model = RemisionCompra
        fields = ['id', 'compra', 'remision_compra']

class EntradaAlmacen(serializers.ModelSerializer):
    class Meta:
        model = EntradaAlmacenCompra
        fields = '__all__'