from django.db import models
from api_models.models import Trabajador, Venta, Compra, Sesion_venta
from django.dispatch import receiver
from django.db.models.signals import pre_save

# Create your models here.
class Caja_Diaria (models.Model):
    fecha_apertura = models.DateField(auto_now_add=True)
    hora_apertura = models.TimeField(auto_now_add=True)
    monto_inicial = models.FloatField()
    responsable_apertura = models.ForeignKey(Trabajador, related_name="responsable_apertura", on_delete=models.SET_NULL, null=True)
    fecha_cierre = models.DateField(null=True, auto_now=True)
    hora_cierre = models.TimeField(null=True, auto_now=True)
    monto_final = models.FloatField(null=True)
    estado_caja = models.BooleanField(default=False, blank=True)
    responsable_cierre = models.ForeignKey(Trabajador, related_name="responsable_cierre", on_delete=models.SET_NULL, null=True)

    @property
    def codigo(self):
        id = str(self.pk)
        return 'CAJA-'+'0'*(5-len(id))+id

    @property
    def monto_actual(self):
        ingresos_otros = Ingresos_Otros.objects.filter(caja=self.pk)
        ingresos_venta = Ingreso_Venta.objects.filter(caja=self.pk)
        ingresos_sesion_venta = Ingreso_Sesion_Venta.objects.filter(caja=self.pk)

        egresos_otros = Egresos_Otros.objects.filter(caja=self.pk)
        egresos_compra = Egresos_Compra.objects.filter(caja=self.pk)

        resultado = 0.0

        for iotros in ingresos_otros:
            resultado += iotros.monto

        for iventa in ingresos_venta:
            resultado += iventa.venta.total

        for isventa in ingresos_sesion_venta:
            resultado += isventa.sesion_venta.total

        for eotros in egresos_otros:
            resultado -= eotros.monto

        for ecompra in egresos_compra:
            resultado -= ecompra.compra.totalCompra

        return resultado + self.monto_inicial

class Registros_Caja (models.Model):
    VENTAS = "Ventas"
    COMPRAS = "Compras"
    INGRESOS_OTROS = "Otros ingresos"
    EGRESOS_OTROS = "Otros egresos"
    VENTA_PEQUENIA = "Venta pequeña"

    TIPO_REGISTRO = [
        (VENTAS, "Ventas"),
        (COMPRAS, "Compras"),
        (VENTA_PEQUENIA, "Venta pequeña"),
        (INGRESOS_OTROS, "Otros ingresos"),
        (EGRESOS_OTROS, "Otros egresos"),
    ]
    
    responsable = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now=True)
    hora = models.TimeField(auto_now=True)
    tipo = models.CharField(max_length=250, choices=TIPO_REGISTRO)


    # Posible modificacion: dejar el property de monto en las 4 tablas
    class Meta:
        abstract = True

DOLARES = "Dolares"
SOLES = "Soles"

TIPO_PAGO = [
    (DOLARES, "Dolares"),
    (SOLES, "Soles"),
]

class Ingresos_Otros (Registros_Caja):
    caja = models.ForeignKey(Caja_Diaria, related_name="ingresos_otros", on_delete=models.CASCADE)
    descripcion = models.TextField()
    documento = models.FileField(upload_to="documents/caja_diaria/ingresos_otros", blank=True, null=True)
    tipo_pago = models.CharField(max_length=50, choices=TIPO_PAGO)
    monto = models.FloatField()
    tipo_documento = models.CharField(max_length=50 ,null=True, blank=True)
    codigo_documento = models.CharField(max_length=50 ,null=True, blank=True)
    @property
    def codigo(self):
        id = str(self.pk)
        return 'OI-'+'0'*(5-len(id))+id

class Egresos_Otros (Registros_Caja):
    caja = models.ForeignKey(Caja_Diaria, related_name="egresos_otros", on_delete=models.CASCADE)
    descripcion = models.TextField()
    documento = models.FileField(upload_to="documents/caja_diaria/egresos_otros", blank=True, null=True)
    tipo_pago = models.CharField(max_length=50, choices=TIPO_PAGO)
    monto = models.FloatField()
    tipo_documento = models.CharField(max_length=50 ,null=True, blank=True)
    codigo_documento = models.CharField(max_length=50 ,null=True, blank=True)
    @property
    def codigo(self):
        id = str(self.pk)
        return 'OE-'+'0'*(5-len(id))+id

class Ingreso_Venta (Registros_Caja):
    caja = models.ForeignKey(Caja_Diaria, related_name="ingresos_venta", on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    @property
    def codigo(self):
        id = str(self.pk)
        return 'IV-'+'0'*(5-len(id))+id

class Egresos_Compra (Registros_Caja):
    caja = models.ForeignKey(Caja_Diaria, related_name="egresos_compra", on_delete=models.CASCADE)
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    @property
    def codigo(self):
        id = str(self.pk)
        return 'EV-'+'0'*(5-len(id))+id

class Ingreso_Sesion_Venta (Registros_Caja):
    caja = models.ForeignKey(Caja_Diaria, related_name="ingresos_sesion_venta", on_delete=models.CASCADE)
    sesion_venta = models.ForeignKey(Sesion_venta, on_delete=models.CASCADE)  
    @property
    def codigo(self):
        id = str(self.pk)
        return 'ISV-'+'0'*(5-len(id))+id 