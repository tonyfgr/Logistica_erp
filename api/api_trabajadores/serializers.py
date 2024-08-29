from api_models.serializers import PersonaSerializer
from api_mantenimientos.serializers import AreasSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer

from api_models.models import Trabajador, Areas

class TrabajadorSerializer(WritableNestedModelSerializer):
    persona = PersonaSerializer()
    class Meta:
        model = Trabajador
        fields = ['id' ,'area', 'codigo', 'tipo_trabajador', 'cargo', 'tipo_contrato','fecha_nacimiento', 'persona']
    def to_representation(self, instance):
        area_info = AreasSerializer(Areas.objects.get(id=instance.area.id)).data if instance.area else None
        representation = super().to_representation(instance)
        representation['area_info'] = area_info
        return representation     