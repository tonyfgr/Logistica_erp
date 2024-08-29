from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import *
from api_clientes.serializers import ClienteEmpresaSerilizer, ClientePersonaSerilizer
from api_productos.serializers import Producto_varianteSerializer

class VentaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta_detalle
        exclude = ('venta',)

class Venta_DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta_detalle
        fields = ['id', 'producto', 'cantidad', 'precio_unitario', 'dscto_unitario', 'precio_final', 'remision_hecha']
        depth = 2
    # def to_representation(self, instance):
    #     print('producto',instance.producto.id)
    #     producto = Producto_variante.objects.get(id=instance.producto.id)
    #     prod_ser = Producto_varianteSerializer(producto)
    #     return {
    #         'id':instance.id,
    #         'producto':prod_ser.data,
    #         'cantidad':instance.cantidad,
    #         'precio_unitario':instance.precio_unitario,
    #         'dscto_unitario':instance.dscto_unitario,
    #         'precio_final':instance.precio_final,
    #         'remision_hecha':instance.remision_hecha
    #     }

class VentaSerializer(WritableNestedModelSerializer):
    detalle_venta = VentaDetalleSerializer(many=True)
    class Meta:
        model = Venta
        fields = ['id', 'cliente', 'estado', 'fecha', 'descuento','total', 'detalle_venta', 'codigo', 'estado_remision', 'nombre_cliente', 'borrado']
    def to_representation(self, instance):
        venta_detalle = Venta_detalle.objects.filter(venta = instance.pk)
        ser_venta_detalle = Venta_DetalleSerializer(venta_detalle, many=True)
        return {
            'id':instance.id,
            'nombre_cliente':instance.nombre_cliente,
            'cliente':instance.nombre_cliente if instance.cliente else None,
            'codigo':instance.codigo,
            'estado': instance.estado,
            'fecha':instance.fecha,
            'descuento': instance.descuento,
            'total':instance.total,
            'estado_remision':instance.estado_remision,
            'detalle_venta':ser_venta_detalle.data,
            'borrado':instance.borrado
        }

class RemisionDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remision_venta_detalle
        fields = ['id', 'codigo', 'venta_detalle']

    def to_representatin(self, instance):
        venta_detalle = Venta_detalle.objects.filter(id = instance.venta_detalle.id)
        ser_venta_detalle = Venta_DetalleSerializer(venta_detalle)
        return {
            'id':instance.id,
            'codigo':instance.codigo,
            'venta_detalle':ser_venta_detalle
        }



class RemisionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remision_venta
        fields = '__all__ '
    def to_representation(self, instance):
        detalle_remision_venta = Remision_venta_detalle.objects.filter(remision_venta=instance.pk)
        ser_detalle_remision_venta = RemisionDetalleSerializer(detalle_remision_venta, many=True)
        return {
            'id': instance.id,
            'codigo': instance.codigo,
            'fecha': instance.fecha,
            'trabajador': instance.trabajador,
            'remision_venta_detalle': ser_detalle_remision_venta.data,
            'venta': instance.venta.id,
            'codigo_venta':instance.venta.codigo,
            'totalRemision':instance.totalRemision,
            'cliente': instance.venta.nombre_cliente,
            'numero_factura': instance.venta.numero_factura,
        }




class DetallePuntoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_punto_venta
        exclude = ('punto_venta',)

class Detalle_PuntoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_punto_venta
        depth = 2
        exclude = ('punto_venta',)

class PuntoVentaSerializer(WritableNestedModelSerializer):
    detalle_punto_venta = DetallePuntoVentaSerializer(many=True)
    class Meta:
        model = Punto_venta
        fields = ['fecha', 'total', 'cliente', 'detalle_punto_venta', 'codigo', 'nombre_cliente', 'estado_remision', 'borrado']
    def to_representation(self, instance):
        punto_venta_detalle = Detalle_punto_venta.objects.filter(punto_venta = instance.id)
        ser_punto_venta_detalle = Detalle_PuntoVentaSerializer(punto_venta_detalle, many=True)
        return {
            'id': instance.id,
            'codigo':instance.codigo,
            'fecha':instance.fecha,
            # 'precio_total':instance.precio_total,
            'total':instance.total,
            'cliente':instance.nombre_cliente if instance.cliente else None,
            'nombre_cliente':instance.nombre_cliente,
            'detalle_punto_venta': ser_punto_venta_detalle.data,
            'estado_remision': instance.estado_remision,
            'borrado':instance.borrado
        }

# class PVSerializer(WritableNestedModelSerializer):
#     detalle_punto_venta = DetallePuntoVentaSerializer(many=True)
#     class Meta:
#         model = Punto_venta
#         fields=['fecha', 'precio_total', 'cliente', 'detalle_punto_venta']

class SesionVentaSerializer(WritableNestedModelSerializer):
    punto_venta = PuntoVentaSerializer(many=True)
    class Meta:
        model = Sesion_venta
        fields = ['fecha', 'responsable', 'hora_fin', 'total', 'punto_venta', 'codigo', 'borrado']
    def to_representation(self, instance):
        punto_venta = Punto_venta.objects.filter(sesion_venta = instance.id)
        ser_punto_venta = PuntoVentaSerializer(punto_venta, many=True)
        print(ser_punto_venta.data)
        return {
            'id':instance.id,
            'codigo':instance.codigo,
            'fecha':instance.fecha,
            'responsable':instance.responsable,
            'hora_fin':instance.hora_fin,
            'total':instance.total,
            'punto_venta': ser_punto_venta.data,
            'borrado':instance.borrado
        }

#SALIDA DE PRODUCTOS DE ALMACEN
class SalidaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion_almacen_producto
        fields = '__all__'