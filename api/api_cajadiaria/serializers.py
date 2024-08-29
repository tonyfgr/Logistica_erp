from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from . models import *

class CajaDiariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja_Diaria
        fields = ['id', 'responsable_apertura', 'monto_inicial', 'monto_final', 'monto_actual', 'estado_caja', 'responsable_cierre']
        read_only_fields = ('fecha_apertura', 'hora_apertura', 'fecha_cierre', 'hora_cierre')

class IngresosVentaSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(read_only=True)
    class Meta:
        model = Ingreso_Venta
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    
    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields["monto"] = instance.venta.total
        fields["codigo_venta"] = instance.venta.codigo
        fields["responsable"] = instance.responsable.persona.nombre
        return fields

class EgresosCompraSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(read_only=True)
    class Meta:
        model = Egresos_Compra
        fields = '__all__'
        read_only_fields = ('fecha', 'hora', )
    
    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields["monto"] = instance.compra.totalCompra
        fields["codigo_compra"] = instance.compra.codigo
        fields["responsable"] = instance.responsable.persona.nombre
        return fields

class IngresosOtrosSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(read_only=True)
    class Meta:
        model = Ingresos_Otros
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields['responsable'] = instance.responsable.persona.nombre
        return fields
    

class EgresosOtrosSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(read_only=True)
    class Meta:
        model = Egresos_Otros
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields['responsable'] = instance.responsable.persona.nombre
        return fields

class IngresosSesionVentaSerializer(serializers.ModelSerializer):
    codigo = serializers.CharField(read_only=True)
    class Meta:
        model = Ingreso_Sesion_Venta
        fields = '__all__'
        read_only_fields = ('fecha', 'hora',)
    def to_representation(self, instance):
        fields = super().to_representation(instance)
        fields["monto"] = instance.sesion_venta.total
        fields["codigo_sesion"] = instance.sesion_venta.codigo
        fields['responsable'] = instance.responsable.persona.nombre
        return fields

class RegistrosCajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja_Diaria
        fields = ['id', 'codigo', 'fecha_apertura', 'hora_apertura', 'fecha_cierre', 'hora_cierre', 'responsable_apertura', 'monto_inicial', 'monto_final', 'monto_actual', 'estado_caja', 'responsable_cierre']
        read_only_fields = ('fecha', 'hora',)
    
    def to_representation(self, instance):
        caja = super().to_representation(instance)

        registros_caja = IngresosVentaSerializer(instance.ingresos_venta, many=True).data + IngresosSesionVentaSerializer(instance.ingresos_sesion_venta, many=True).data + IngresosOtrosSerializer(instance.ingresos_otros, many=True).data + EgresosCompraSerializer(instance.egresos_compra, many=True).data + EgresosOtrosSerializer(instance.egresos_otros, many=True).data

        caja["registros_caja"] = registros_caja

        return caja