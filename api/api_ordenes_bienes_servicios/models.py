from django.db import models

from api_models.models import Proveedores

from api_requerimientos.models import Requerimiento

# Create your models here.
NINGUNO = "Ninguno"

SERVICIO = "Servicio"
BIEN = "Bien"

SOLICITANDO_COTIZACION = "Solicitando cotización"
APROBADO = "Aprobado"
EN_PROGRESO = "En progreso"
DENEGADO = "Denegado"
COMPLETADO = "Completado"

ESTADO_SOLICITUD = [
    (NINGUNO, "Ninguno"),
    (SOLICITANDO_COTIZACION, "Solicitando cotización"),
    (APROBADO, "Aprobado"),
    (EN_PROGRESO, "En progreso"),
    (DENEGADO, "Denegado"),
    (COMPLETADO, "Completado")
]

# Ordenes de bienes
class Propuesta_Empresa_Bien_Documentos(models.Model):
    propuesta_tecnica_documento = models.FileField(upload_to="documents/bienes/propuesta_tecnica", blank=True, null=True)
    propuesta_economica_documento = models.FileField(upload_to="documents/bienes/propuesta_economica", blank=True, null=True)
    bien_cotizacion_documento = models.FileField(upload_to="documents/bienes/cotizacion", blank=True, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

class Orden_bien(models.Model):
    uso_en_compra = models.BooleanField(default=False)
    bien_nombre = models.CharField(max_length=500)
    bien_estado = models.CharField(max_length=50, choices=ESTADO_SOLICITUD, default=NINGUNO)
    mayor_500 = models.BooleanField(default=False)
    requerimiento = models.ForeignKey(Requerimiento, on_delete=models.CASCADE, null=True)

    @property
    def codigo(self):
        pk = str(self.pk)
        return "OB-"+"0"*(5-len(pk))+pk


class Propuesta_Empresa_Bien(models.Model):
    estado = models.BooleanField(default=False)
    proveedor_id = models.ForeignKey(Proveedores, on_delete=models.CASCADE, null=True)
    orden_bien = models.ForeignKey(Orden_bien, related_name="orden_bien", on_delete=models.CASCADE, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)
    propuesta_documentos_bien = models.OneToOneField(Propuesta_Empresa_Bien_Documentos, on_delete=models.CASCADE)

# Ordenes de servicios
class Propuesta_Empresa_Servicio_Documentos(models.Model):
    estado = models.BooleanField(default=False)
    propuesta_tecnica_documento = models.FileField(upload_to="documents/servicios/propuesta_tecnica", blank=True, null=True)
    propuesta_economica_documento = models.FileField(upload_to="documents/servicios/propuesta_economica", blank=True, null=True)
    servicio_cotizacion_documento = models.FileField(upload_to="documents/servicios/cotizacion", blank=True, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

class Orden_servicio(models.Model):
    servicio_nombre = models.CharField(max_length=500)
    servicio_estado = models.CharField(max_length=50, choices=ESTADO_SOLICITUD, default=NINGUNO)
    mayor_500 = models.BooleanField(default=False)
    requerimiento = models.ForeignKey(Requerimiento, on_delete=models.CASCADE, null=True)

    @property
    def codigo(self):
        pk = str(self.pk)
        return "OS-"+"0"*(5-len(pk))+pk

class Propuesta_Empresa_Servicio(models.Model):
    estado = models.BooleanField(default=False)
    empresa_servicio = models.CharField(max_length=250, null=True)
    orden_servicio = models.ForeignKey(Orden_servicio, related_name="orden_servicio", on_delete=models.CASCADE, null=True)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)
    propuesta_documentos_servicio = models.OneToOneField(Propuesta_Empresa_Servicio_Documentos, on_delete=models.CASCADE)