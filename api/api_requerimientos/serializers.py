from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import *
from api_mantenimientos.serializers import *

class RequerimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requerimiento
        fields = ['id', 'nombre_persona_requerimiento', 'titulo', 'descripcion', 'area_solicitante' , 'almacen' , 'fecha_registro', 'fecha_modificacion', 'tipo' ,'codigo']
        read_only_fields = ("fecha_registro", "hora_registro", "fecha_modificacion", "hora_modificacion", "codigo",)
    def to_representation(self, instance):
        print(instance)
        representation = super().to_representation(instance)
        area = AreasSerializer(instance.area_solicitante).data if instance.area_solicitante else None
        representation['area_solicitante'] = area  if instance.area_solicitante else None
        almacen = AlmacenSerializer(instance.almacen).data if instance.almacen else None
        representation['almacen'] = almacen if instance.almacen else None
        representation['codigo'] = instance.codigo
        return representation 

# class RequerimientoServicioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Requerimiento_Servicio
#         fields = "__all__"
#         read_only_fields = ("fecha_registro", "hora_registro", "fecha_modificacion", "hora_modificacion",)