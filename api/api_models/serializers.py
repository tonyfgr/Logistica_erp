from .models import *
from rest_framework import serializers
from api_mantenimientos.serializers import ProviciasSerializer


class PersonaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Persona
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        provincia_info = ProviciasSerializer(instance.codprovincia).data if instance.codprovincia else None
        representation['provincia_info'] = provincia_info if instance.codprovincia else None
        return representation  

class EmpresaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Empresa
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        provincia_info = ProviciasSerializer(instance.codprovincia).data if instance.codprovincia else None
        representation['provincia_info'] = provincia_info if instance.codprovincia else None
        return representation  