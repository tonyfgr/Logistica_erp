from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User
from api_models.serializers import EmpresaSerializer, PersonaSerializer
from api_mantenimientos.serializers import FormapagoSerializer

#Import models
from api_models.models import (
    Clientes, Persona, Empresa
)

class ClientePersonaSerilizer(WritableNestedModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','persona','codformapago','borrado','codigo']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        forma_dp_info = FormapagoSerializer(instance.codformapago).data if instance.codformapago else None
        representation['forma_dp_info'] = forma_dp_info if instance.codformapago else None
        return representation 
        
class ClienteEmpresaSerilizer(WritableNestedModelSerializer):
    empresa = EmpresaSerializer()
    class Meta:
        model = Clientes
        fields = ['id','empresa','codformapago','borrado','codigo']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        forma_dp_info = FormapagoSerializer(instance.codformapago).data if instance.codformapago else None
        representation['forma_dp_info'] = forma_dp_info if instance.codformapago else None
        return representation 
 

        