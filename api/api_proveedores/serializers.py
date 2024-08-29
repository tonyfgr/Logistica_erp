from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from api_models.models import Persona, Empresa, Proveedores
from api_models.serializers import EmpresaSerializer, PersonaSerializer


class ProveedorPersonaSerializer(WritableNestedModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Proveedores
        fields = ['id', 'persona', 'empresa','ruc', 'borrado', 'codigo']

class ProveedorEmpresaSerializer(WritableNestedModelSerializer):
    empresa = EmpresaSerializer()
    class Meta:
        model = Proveedores
        fields = ['id', 'persona', 'empresa','ruc', 'borrado', 'codigo']
    
# class ProveedoresSerializer(serializers.ModelSerializer):
#     persona = PersonaSerializer(required=False)
#     empresa = EmpresaSerializer(required=False)
#     class Meta:
#         model = Proveedores
#         fields = '__all__'
#         depth=2
#         read_only_fields = ('id', 'borrado')
    
#     def create(self, validated_data):
#         data_persona = validated_data.get("persona",None)
#         data_empresa = validated_data.get("empresa",None)
#         if data_persona:
#             empresa = None
#             data_persona = validated_data.pop("persona")
#             persona = Persona.objects.create(**data_persona)
#         if data_empresa:
#             persona = None
#             data_empresa = validated_data.pop("empresa")
#             empresa = Empresa.objects.create(**data_empresa)
#         proveedor = Proveedores.objects.create(**validated_data,persona=persona,empresa=empresa)
#         return proveedor
    
#     def update(self, instance,validated_data):
#         #Getting the values of the instance(the prov who equals the id)
#         persona = instance.persona
#         empresa = instance.empresa
#         #Updating persona
#         if persona:
#             data_persona = validated_data.pop("persona")
#             persona.nombre = data_persona.get("nombre",persona.nombre)
#             persona.dni = data_persona.get("dni",persona.dni)
#             persona.codprovincia = data_persona.get("codprovincia",persona.codprovincia)
#             persona.localidad = data_persona.get("localidad",persona.localidad)
#             persona.direccion = data_persona.get("direccion",persona.direccion)
#             persona.codpostal = data_persona.get("codpostal",persona.codpostal)
#             persona.cuentabancaria = data_persona.get("cuentabancaria",persona.cuentabancaria)
#             persona.telefono = data_persona.get("telefono",persona.telefono)
#             persona.movil = data_persona.get("movil",persona.movil)
#             persona.web = data_persona.get("web",persona.web)
#             persona.save()
#         #Updating empresa
#         if empresa:
#             data_empresa = validated_data.pop("empresa")
#             empresa.nombre = data_empresa.get("nombre",empresa.nombre)
#             empresa.estructurajuridica = data_empresa.get("estructurajuridica",empresa.estructurajuridica)
#             empresa.codprovincia = data_empresa.get("codprovincia",empresa.codprovincia)
#             empresa.tipo = data_empresa.get("tipo",empresa.tipo)
#             empresa.localidad = data_empresa.get("localidad",empresa.localidad)
#             empresa.direccion = data_empresa.get("direccion",empresa.direccion)
#             empresa.codpostal = data_empresa.get("codpostal",empresa.codpostal)
#             empresa.cuentabancaria = data_empresa.get("cuentabancaria",empresa.cuentabancaria)
#             empresa.telefono = data_empresa.get("telefono",empresa.telefono)
#             empresa.movil = data_empresa.get("movil",empresa.movil)
#             empresa.web = data_empresa.get("web",empresa.web)
#             empresa.save()
#         #Updating proveedor
#         instance.ruc = validated_data.get("ruc", instance.ruc)
#         instance.save()
#         return instance
