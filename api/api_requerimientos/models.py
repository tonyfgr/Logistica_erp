from django.db import models
from api_models.models import Areas, Almacen

# Create your models here.
class Requerimiento(models.Model):
    BIEN = 'bien'
    SERVICIO = 'servicio'
    ESTADO = [
        (BIEN, 'bien'),
        (SERVICIO, 'servicio'),
    ]
    nombre_persona_requerimiento = models.CharField(max_length=50, null=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()
    area_solicitante = models.ForeignKey(Areas, on_delete=models.CASCADE)
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE, null=True)
    fecha_registro = models.DateField(auto_now_add=True, null=True)
    # hora_registro = models.TimeField(auto_now_add=True, null=True)
    fecha_modificacion = models.DateField(auto_now=True, null=True)
    # hora_modificacion = models.TimeField(auto_now=True, null=True)
    tipo = models.CharField(max_length=100, choices=ESTADO)
    def __str__(self):
        return 'REQ-'+str(self.pk)

    @property
    def codigo(self):
        id = str(self.pk)
        if self.tipo == 'bien':
            return 'BREQ-'+'0'*(10-len(id))+id
        else:
            return 'SREQ-'+'0'*(10-len(id))+id 


# class Requerimiento_Servicio(models.Model):
#     nombre_persona_requerimiento = models.CharField(max_length=50, null=True)
#     titulo = models.CharField(max_length=50)
#     descripcion = models.TextField()
#     area_solicitante = models.ForeignKey(Areas, on_delete=models.CASCADE)
#     fecha_registro = models.DateField(auto_now_add=True, null=True)
#     hora_registro = models.TimeField(auto_now_add=True, null=True)
#     fecha_modificacion = models.DateField(auto_now=True, null=True)
#     hora_modificacion = models.TimeField(auto_now=True, null=True)