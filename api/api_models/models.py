from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _ 
from django.utils import timezone



#CHOICES
CHOICES_YES_NO = (("Sí", "Sí"),
    ("No", "No"))

CHOICES_PRIM_INS = [
    ("Materia Prima", "Materia Prima"),
    ("Insumo", "Insumo"),
    ("Ninguno", "Ninguno")
]

############################################################
#IMAGENES
############################################################
def upload_toArt(instance, filename):
    return 'articulos/{filename}'.format(filename=filename)
def upload_toProd(instance, filename):
    return 'productos/{filename}'.format(filename=filename)
def upload_toCom(instance, filename):
    return 'compras/{filename}'.format(filename=filename)

class Areas(models.Model):
    nombre = models.CharField(max_length=100, default='UNDEFINED')
    abreviacion = models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.nombre.upper()

class Provincias(models.Model):
    nombreprovincia = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombreprovincia

class Persona(models.Model):
    nombre = models.CharField(max_length=100, default="-")
    dni = models.CharField(max_length=100, default="-")
    codprovincia = models.ForeignKey(Provincias, on_delete=models.CASCADE, null=True)
    localidad = models.CharField(max_length=100, default="-")
    direccion = models.CharField(max_length=500, default="-")
    codpostal = models.CharField(max_length=100, default="-")
    cuentabancaria = models.CharField(max_length=100, default="-")
    telefono = models.CharField(max_length=100, default="-")
    movil = models.CharField(max_length=100, default="-")
    web = models.CharField(max_length=100, default="-")
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.nombre

############################################################
#TRABAJADOR
############################################################

def get_default_area():
    """ get a default value for action status; create new status if not available """
    return Areas.objects.get_or_create(nombre="Ninguno")[0].pk


class Trabajador(models.Model):
    INTERNO = 'Interno'
    CONTRATISTA = 'Contratista'
    NINGUNO = 'Ninguno'

    TIPOS = [
        (INTERNO, 'Interno'),
        (CONTRATISTA, 'Contratista'),
        (NINGUNO, 'Ninguno')
    ]

    TIEMPO_PARCIAL = 'Tiempo parcial'
    TIEMPO_COMPLETO = 'Tiempo completo'

    TIPOS_CONTRATOS = [
        (TIEMPO_PARCIAL, 'Tiempo parcial'),
        (TIEMPO_COMPLETO, 'Tiempo completo'),
    ]

    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    tipo_trabajador = models.CharField(max_length=30, choices=TIPOS, default=NINGUNO)
    tipo_contrato = models.CharField(max_length=30, choices=TIPOS_CONTRATOS, default=TIEMPO_COMPLETO)
    cargo = models.CharField(max_length=50, default=NINGUNO)
    area = models.ForeignKey(Areas, on_delete=models.CASCADE, default=get_default_area, null=True)
    fecha_nacimiento = models.DateField(null=True)
    borrado = models.CharField(max_length=1, default=0)

    def __str__(self):
        if self.persona:
            return "Nombre trabajador:{}, Tipo:{}".format(self.persona.nombre, self.tipo_trabajador)    
        else:
            return "Nombre trabajador:{}, Tipo:{}".format(self.empresa.nombre, self.tipo_trabajador)

    @property
    def codigo(self):
        id = str(self.pk)
        tt = str(self.tipo_trabajador)[0]
        tc = 'TC' if self.tipo_contrato == 'Tiempo Completo' else 'TP'
        a = str(self.area.abreviacion)
        return f'{tc}-{tt}-{a}-'+'0'*(5-len(id))+id

# USER AUTHENTICATION
class Profile_User(models.Model):

    NINGUNO = "Ninguno"

    LOGISTICA = "Logística"

    TRABAJADOR = "Trabajador"
    GERENTE = "Gerente"

    AREAS = [
        (NINGUNO, "Ninguno"),
        (LOGISTICA, "Logística"),
    ]

    ROLES = [
        (NINGUNO, "Ninguno"),
        (TRABAJADOR, "Trabajador"),
        (GERENTE, "Gerente")
    ]
 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile_user")
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE, null=True)
    rol = models.CharField(max_length=100, choices=ROLES, default=NINGUNO)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_ultima_modificacion = models.DateField(auto_now=True)

    def __str__(self):
        return "Usuario:{}, Rol:{}, Area:{}",format(self.profile_user.username, self.rol, self.area)

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile_User.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile_user.save()
        
############################################################
# MODELOS DE MANTENIMIENTO
############################################################

class Formapago(models.Model):
    nombrefp = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombrefp

class Entidades(models.Model):
    nombreentidad = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombreentidad

class Almacen(models.Model):
    nombre = models.CharField(max_length=100)
    abreviacion = models.CharField(max_length=20, blank=True, null=True)
    descripcion = models.CharField(max_length=400, default='-')
    ubicacion = models.CharField(max_length=400, default='-')
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        if not self.abreviacion:
            return self.nombre
        return self.abreviacion
    

class Impuestos(models.Model):
    nombre = models.CharField(max_length=100)
    valor = models.FloatField(validators=[MinValueValidator(0.0)])
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

class Embalajes(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

############################################################
#MODELOS GENERALES PERSONA Y EMPRESA
############################################################

class Empresa(models.Model):
    nombre = models.CharField(max_length=100, default="-")
    ruc = models.CharField(max_length=100, default="-")
    estructurajuridica = models.CharField(max_length=100, default="-")
    tipo = models.CharField(max_length=100, default="-")
    codprovincia = models.ForeignKey(Provincias, on_delete=models.CASCADE)
    localidad = models.CharField(max_length=100, default="-")
    direccion = models.CharField(max_length=500, default="-")
    codpostal = models.CharField(max_length=100, default="-")
    cuentabancaria = models.CharField(max_length=100, default="-")
    telefono = models.CharField(max_length=100, default="-")
    movil = models.CharField(max_length=100, default="-")
    web = models.CharField(max_length=100, default="-")
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.nombre

############################################################
#CLIENTES
############################################################

class Clientes(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    codformapago = models.ForeignKey(Formapago, on_delete=models.CASCADE)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        if self.persona:
            return f'{self.persona.nombre}'
        else:
            return f'{self.empresa.nombre}'

    @property
    def codigo(self):
        id = str(self.pk)
        return 'CLIE-'+'0'*(5-len(id))+id

############################################################
#PROVEEDORES
############################################################

class Proveedores(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    ruc = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        if self.persona:
            return f'{self.persona.nombre}'
        else:
            return f'{self.empresa.nombre}'
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'PROV-'+'0'*(5-len(id))+id

############################################################
#ARTICULOS
############################################################

 

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre


class Articulo(models.Model): 
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100, default='-')
    proveedor = models.ForeignKey(Proveedores, on_delete=models.CASCADE, null=True, blank=True)
    marca = models.CharField(max_length=100, default='-')
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    imagen = models.ImageField( _("Image") ,upload_to=upload_toArt,default='blancos.png', blank=True, null=True)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.nombre
    
    @property
    def nombre_proveedor(self):
        if self.proveedor.persona:
            return f'{self.proveedor.persona.nombre}'
        else:
            return f'{self.proveedor.empresa.nombre}'

    @property
    def codigo(self):
        id = str(self.pk)
        return 'ART-'+'0'*(5-len(id))+id

class ArticuloVariante(models.Model):
    nombre = models.CharField(max_length=100, default='-')
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, null=True, related_name='variantes')
    precio_unitario = models.FloatField(validators=[MinValueValidator(0.0)],default=0.0)
    embalaje = models.ForeignKey(Embalajes, on_delete=models.CASCADE, null=True, blank=True)
    cantidad = models.PositiveIntegerField(default=0)
    ubicacion = models.CharField(max_length=300, default='-') #por ejemplo alguna estantería
    almacen = models.ForeignKey(Almacen, on_delete=models.SET_NULL, null=True, blank=True)
    descripcion = models.CharField(max_length=500, default='-')


    def __str__(self):
        return self.articulo.nombre +'-'+ self.nombre
    
    @property
    def codigo(self):
        id = str(self.pk)
        almacen = self.almacen.abreviacion if self.almacen else "ND"
        return almacen+'-'+'0'*(5-len(id))+id

############################################################
#PRODUCTO
############################################################


class Categoria_producto(models.Model):
    nombre = models.CharField(max_length=100)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    # cantidad = models.IntegerField(default=0)
    descripcion_producto = models.TextField(null=True, blank=True)
    categoria=models.ForeignKey(Categoria_producto, related_name='categoria_producto', on_delete=models.SET_NULL, null=True)
    imagen = models.ImageField( _("Image") ,upload_to=upload_toProd,default='blancos.png', blank=True)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.nombre
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'PROD-'+'0'*(5-len(id))+id


class Producto_variante(models.Model):
    producto = models.ForeignKey(Producto,related_name='producto_variante', on_delete=models.CASCADE, null=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100, null=True, blank=True)
    # almacen = models.ForeignKey(Almacen, on_delete=models.SET_NULL, null=True, blank=True)  #ALmacen de Prod Terminado o Almacen Tienda #x
    # almacen = models.ForeignKey(Ubicacion_almacen, on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=100, null=True, blank=True, default='-')
    talla = models.CharField(max_length=100, null=True, blank=True, default='-')
    # horas_manufactura=models.IntegerField(default=0)
    # costo_manufactura=models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    costo_produccion=models.FloatField(validators=[MinValueValidator(0.0)], default=30.0)
    # precio_final = models.FloatField(validators=[MinValueValidator(0.0)], default=0.0)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.producto.nombre +'-'+ self.nombre

    @property
    def codigo(self):
        id = str(self.pk)
        return 'PV-'+'0'*(5-len(id))+id
    
    @property
    def precio_venta(self):
        suma = 0
        prodDetalle = Producto_detalle.objects.filter(variante = self.id)
        for item in prodDetalle:
            suma += item.precio + self.costo_produccion
        return suma

class Ubicacion_almacen_producto(models.Model):
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE, null=True)
    cantidad = models.IntegerField(default=0, null=True)
    producto_variante = models.ForeignKey(Producto_variante, on_delete=models.CASCADE, null=True, related_name='ubicacion_producto')

class Producto_detalle(models.Model):
    variante = models.ForeignKey(Producto_variante,related_name='producto_detalle', on_delete=models.CASCADE, null=True)
    articulo = models.ForeignKey(ArticuloVariante, on_delete=models.CASCADE, null=True, related_name='variantes')
    cantidad = models.IntegerField(default=0)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return self.variante.producto.nombre + "-" + self.variante.nombre + "-" + self.articulo.nombre

    @property
    def precio(self):
        suma = 0
        for item in range(self.cantidad):
            suma += self.cantidad * self.articulo.precio_unitario
        return suma

############################################################
#FACTURAS
############################################################

class Factura(models.Model):
    fecha = models.DateField(null=True)
    iva = models.IntegerField()
    totalfactura = models.FloatField(default=0, null=True) 

###########################################################
#----------------------- SERVICIOS -----------------------#
###########################################################

#"contratista" en Servicios es la empresa o persona al que se va a pedir el servicio 
class Servicios(models.Model):
    nombre = models.CharField(max_length=200)
    contratista = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    descripcion = models.TextField()
    precio = models.FloatField()

    def __str__(self):
        if self.contratista.persona:
            return "Servicio:{}, Trabajador:{}".format(self.nombre, self.contratista.persona.nombre)
        else:
            return "Servicio:{}, Trabajador:{}".format(self.nombre, self.contratista.empresa.nombre)

#Orden de compra para el servicio
##"trabajador" es la persona de logistica que va a realizar el pedido 
class Orden_compra_servicio(models.Model):
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    fecha_orden_servicio = models.DateTimeField()

    def __str__(self):
        if self.trabajador.persona:
            return "Trabajador:{}".format(self.trabajador.persona.nombre)
        else:
            return "Trabajador:{}".format(self.trabajador.empresa.nombre)

#Servicio(s) dentro de la orden de compra
class Servicio_compra(models.Model):
    servicio = models.ForeignKey(Servicios, on_delete=models.CASCADE)
    orden_compra = models.ForeignKey(Orden_compra_servicio, on_delete=models.CASCADE, null=True)
    fecha_compra = models.DateField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    precio_compra = models.FloatField(null=True)

#Comprobante que muestra el total de servicios 
class Recibir_orden_servicio(models.Model):
    orden_compra_referencia = models.OneToOneField(Orden_compra_servicio, on_delete=models.CASCADE, null=True)
    fecha_pedido = models.DateTimeField()
    costo_total = models.FloatField()
    
    def __str__(self):
        return "Orden de compra:{}".format(self.servicio_compra_referencia)



###########################################################
#----------------------- ALMACENES -----------------------#
###########################################################

#Unidades
class Unidad(models.Model):
    nombre = models.CharField(max_length=100)
    valor = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.nombre

#Areas a las cuales puede pertenecer un trabajador



###########################################################
#----------------------- COMPRAS -----------------------#
###########################################################
class Compra(models.Model):
    from api_ordenes_bienes_servicios.models import Orden_bien
    fecha = models.DateTimeField(null=True)
    orden_bien = models.ForeignKey(Orden_bien, on_delete=models.SET_NULL, null=True)
    proveedor = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    estado = models.BooleanField(null=True, blank=True, default=False)
    detalle_entrega = models.TextField(default='-', null=True, blank=True)
    imagen_fac_compra = models.ImageField( _("Image") ,upload_to=upload_toCom,default='blancos.png', blank=True)
    descuento = models.FloatField(default=0, null=True)
    numero_factura = models.TextField(default='-', null=True, blank=True)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return 'C-'+str(self.pk)

    @property
    def nombre_proveedor(self):
        if self.proveedor.persona:
            return f'{self.proveedor.persona.nombre}'
        else:
            return f'{self.proveedor.empresa.nombre}'
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'C-'+'0'*(5-len(id))+id

    @property
    def estado_remision (self):
        if self.borrado == True:
            return "-"
        detallesCompra = CompraDetalle.objects.filter(compra=self.id)
        cant = 0
        for item in detallesCompra:
            if item.remision_hecha == False:
                cant += 1
        if cant == len(detallesCompra):
            return "Por Hacer"
        elif cant == 0:
            return "Hecha"
        else:
            return "Incompleta"

    @property
    def totalCompra (self):
        total = 0
        detallesCompra = CompraDetalle.objects.filter(compra=self.id)
        for item in detallesCompra:
            total += item.cantidad * item.precio_unitario
        return total


class CompraDetalle(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE,related_name='detalle_compra')
    articulo = models.ForeignKey(ArticuloVariante, on_delete=models.CASCADE, null=True)
    unidad = models.PositiveIntegerField(default=1)
    cantidad = models.PositiveIntegerField(default=0)
    precio_unitario = models.FloatField(default=0)
    dscto_unitario = models.FloatField(null=True, default=0, blank=True)
    remision_hecha = models.BooleanField(null=True, blank=True, default=False)
    
    def __str__(self):
        return 'C-'+str(self.compra.pk)+'-D'+str(self.pk)

    @property
    def nombre_articulo(self):
        return self.articulo.articulo.nombre+'/'+self.articulo.nombre

class RemisionCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE, related_name='remision_compra')
    fecha = models.DateTimeField(auto_now_add=True)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return 'RC-'+str(self.pk)

    @property
    def codigo(self):
        id = str(self.pk)
        return 'RC-'+'0'*(5-len(id))+id

    @property
    def totalRemision(self):
        total = 0
        detallesRemision = RemisionDetalleCompra.objects.filter(remision_compra=self.id)
        for item in detallesRemision:
            total += item.compra_detalle.cantidad * item.compra_detalle.precio_unitario
        return total
        

class RemisionDetalleCompra(models.Model):
    remision_compra = models.ForeignKey(RemisionCompra, on_delete=models.CASCADE, related_name='remision_compra_detalle')
    compra_detalle = models.ForeignKey(CompraDetalle, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return 'RCD-'+str(self.pk)
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'RDC-'+'0'*(5-len(id))+id
###########################################################
#----------------------- VENTAS -----------------------#
###########################################################

class Venta(models.Model):
    fecha = models.DateTimeField(null=True)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE)
    estado = models.BooleanField(null=True, blank=True, default=False)
    detalle_entrega = models.TextField(default='-', null=True, blank=True)
    descuento = models.FloatField(default=0, null=True)
    numero_factura = models.TextField(default='-', null=True, blank=True)
    borrado = models.BooleanField(default=False, null=True)
    def __str__(self):
        return 'V-'+str(self.pk)

    @property
    def codigo(self):
        id = str(self.pk)
        return 'V-'+'0'*(5-len(id))+id

    @property
    def nombre_cliente(self):
        if self.cliente.persona:
            return f'{self.cliente.persona.nombre}'
        else:
            return f'{self.cliente.empresa.nombre}'
    
    @property
    def estado_remision (self):
        if self.borrado == True:
            return "-"
        detallesVenta = Venta_detalle.objects.filter(venta=self.id)
        cant = 0
        for item in detallesVenta:
            if item.remision_hecha == False:
                cant += 1
        if cant == len(detallesVenta):
            return "Por Hacer"
        elif cant == 0:
            return "Hecha"
        else:
            return "Incompleta"
    
    @property
    def total (self):
        total = 0
        detallesVenta = Venta_detalle.objects.filter(venta=self.id)
        for item in detallesVenta:
            total += ((item.cantidad * item.precio_unitario)*0.18)+(item.cantidad * item.precio_unitario)
        return total

class Venta_detalle(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE,related_name='detalle_venta')
    producto = models.ForeignKey(Producto_variante, on_delete=models.CASCADE, null=True)
    cantidad = models.PositiveIntegerField(default=0, null=True)
    precio_unitario = models.FloatField(default=0, null=True)
    dscto_unitario = models.FloatField(null=True, default=0, blank=True)
    precio_final = models.FloatField(default=0, null=True)
    remision_hecha = models.BooleanField(null=True, blank=True, default=False)
    
    def __str__(self):
        return 'V-'+str(self.venta.pk)+'-D'+str(self.pk)
    

class Remision_venta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='remision_venta', null=True)
    fecha = models.DateTimeField(auto_now_add=True)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return 'RC-'+str(self.pk)

    @property
    def codigo(self):
        id = str(self.pk)
        return 'RC-'+'0'*(5-len(id))+id

    @property
    def totalRemision(self):
        total = 0
        detallesRemision = Remision_venta_detalle.objects.filter(remision_venta=self.id)
        for item in detallesRemision:
            total += item.venta_detalle.cantidad * item.venta_detalle.precio_unitario
        return total

class Remision_venta_detalle(models.Model):
    remision_venta = models.ForeignKey(Remision_venta, on_delete=models.CASCADE, related_name='remision_venta_detalle', null=True)
    venta_detalle = models.ForeignKey(Venta_detalle, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return 'RCD-'+str(self.pk)
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'RDC-'+'0'*(5-len(id))+id

#### Punto de Venta

class Sesion_venta(models.Model):
    fecha = models.DateTimeField(null=True)
    responsable = models.CharField(max_length=100)
    # trabajador = models.ForeignKey(Trabajador, on_delete=models.SET_NULL, null=True)
    hora_fin = models.DateTimeField(null=True)
    # monto_final = models.FloatField(default=0, null=True)
    borrado = models.BooleanField(default=False, null=True)
    
    def __str__(self):
        return 'SVM-'+str(self.pk)
    
    @property
    def codigo(self):
        id = str(self.pk)
        return 'SV-'+'0'*(5-len(id))+id
    
    @property
    def total (self):
        total = 0
        puntoVenta = Punto_venta.objects.filter(sesion_venta=self.id)
        for item in puntoVenta:
            total += item.total
        return total

    


class Punto_venta(models.Model):
    sesion_venta = models.ForeignKey(Sesion_venta, on_delete=models.CASCADE, related_name='punto_venta')
    fecha = models.DateTimeField(auto_now=True)
    detalle_entrega = models.TextField(default='-', null=True, blank=True)
    # precio_total = models.FloatField(default=0)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE, null=True)
    borrado = models.BooleanField(default=False, null=True)

    def __str__(self):
        return 'PV-'+str(self.pk)

    @property
    def codigo(self):
        id = str(self.pk)
        return 'VNCLIE-'+'0'*(10-len(id))+id
    
    @property
    def nombre_cliente(self):
        if self.cliente.persona:
            return f'{self.cliente.persona.nombre}'
        else:
            return f'{self.cliente.empresa.nombre}'
    
    @property
    def estado_remision (self):
        return "Hecha"

    @property
    def total (self):
        total = 0
        detallePuntoVenta = Detalle_punto_venta.objects.filter(punto_venta=self.id)
        for item in detallePuntoVenta:
            total += ((item.cantidad * item.precio_unitario)*0.18)+(item.cantidad * item.precio_unitario)
        return total
    
class Detalle_punto_venta(models.Model):
    punto_venta = models.ForeignKey(Punto_venta, on_delete=models.CASCADE, related_name='detalle_punto_venta')
    producto = models.ForeignKey(Producto_variante, on_delete=models.CASCADE, null=True)
    cantidad = models.PositiveIntegerField(default=0)
    precio_unitario = models.FloatField(default=0)

    def __str__(self):
        return 'PV-'+str(self.punto_venta.pk)+'-D'+str(self.pk)
    

#################################################################
#----------------------- ENTRADA ALMACEN -----------------------#
#################################################################
class EntradaAlmacen (models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.CharField(max_length=300, default='-')
    estado = models.BooleanField(null=True, blank=True, default=False)
    trabajador_receptor = models.ForeignKey(Trabajador, on_delete=models.SET_NULL, null=True ,related_name='trabajador_receptor') 
    class Meta:
        abstract = True

class EntradaAlmacenCompra(EntradaAlmacen):
    remision = models.ForeignKey(RemisionDetalleCompra, on_delete=models.CASCADE)
    def __str__(self):
        return self.pk
    


class AlmacenProductosTerminados (models.Model):
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    productos_terminados = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=0)
    ubicacion = models.CharField(max_length=300, default='-') #por ejemplo alguna estantería
    observaciones = models.CharField(max_length=500, default='-')

    def __str__(self):
        return self.pk

################################################################
#----------------------- SALIDA ALMACEN -----------------------#
################################################################
class Salidas (models.Model):
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    descripcion = models.CharField(max_length=300)
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE) #quien autorizo la salida
    class Meta:
        abstract = True

class RequerimientoSalida(models.Model):
    COMPLETO = 'completo'
    INCOMPLETO = 'incompleto'
    ESTADO = [
        (COMPLETO, 'completo'),
        (INCOMPLETO, 'incompleto'),
    ]
    
    fecha_solicitud = models.DateField(auto_now_add=True)
    fecha_entrega = models.DateField()
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE)
    unidad_solicitada = models.ForeignKey(Unidad, on_delete=models.CASCADE,related_name='unidad_solicitante')
    cantidad_solicitada = models.PositiveIntegerField(default=0)
    unidad_recibida = models.ForeignKey(Unidad, on_delete=models.CASCADE, related_name='unidad_recibida')
    cantidad_recibida = models.PositiveIntegerField(default=0)
    area_solicitante = models.ForeignKey(Areas, on_delete=models.CASCADE,related_name='area_solicitante')
    area_entrega = models.ForeignKey(Areas, on_delete=models.CASCADE, related_name='area_entrega')
    trabajador_solicitante = models.ForeignKey(Trabajador, on_delete=models.CASCADE,related_name='trabajador_solicitante')
    trabajador_entrega = models.ForeignKey(Trabajador, on_delete=models.CASCADE,related_name='trabajador_entrega')
    estado = models.CharField(max_length=100, choices=ESTADO, default=INCOMPLETO)

    def __str__(self):
        return self.pk



# Salidas de una area para otra
class SalidaRequerimientoSalida(Salidas):
    requerimiento = models.ForeignKey(RequerimientoSalida, on_delete=models.CASCADE) #modelo del requerimiento de salida
    unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.pk
    
class SalidaProducto(models.Model):
    producto = models.ForeignKey(Producto_variante, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.pk

##############################################################
#----------------------- LIBRO DIARIO -----------------------#
##############################################################
# class Libro_diario(models.Model):
#     COMPRA = 'Compra'
#     VENTA = 'Venta'
#     NINGUNO = 'Ninguno'

#     TIPOS = [
#         (COMPRA, 'Compra'),
#         (VENTA, 'Venta'),
#         (NINGUNO, 'Ninguno')
#     ]

#     obtener_factura = models.ForeignKey(Factura, on_delete=models.CASCADE)
#     tipo = models.CharField(max_length=20, choices=TIPOS, default=NINGUNO)

#     def __str__(self):
#         return "Factura:{}, Tipo:{}".format(self.factura.id, self.tipo)

# class LibroDiario(models.Model):
#     fecha = models.DateField()
#     descripcion = models.CharField(max_length=255)
#     cuenta_debito = models.CharField(max_length=255)
#     cuenta_credito = models.CharField(max_length=255)
#     monto = models.DecimalField(max_digits=10, decimal_places=2)
#     transaccion = models.ForeignKey(Transaccion, on_delete=models.CASCADE)

############################################################
#----------------------- PRODUCCION -----------------------#
############################################################
# class Poduccion_requerimiento(models.Model):
    # producto = models.

class Produccion(models.Model):

    NINGUNO = 'No Iniciado'
    PROCESO = 'En proceso'
    TERMINADO = 'Terminado'

    PROCESOSPROD = [
        (NINGUNO, 'No Iniciado'),
        (PROCESO, 'En proceso'),
        (TERMINADO, 'Terminado'),
    ]

    factura_clie = models.ForeignKey(Venta, on_delete=models.CASCADE, null=True)
    fecha_inicio = models.DateField(auto_now_add=True)
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=100, choices=PROCESOSPROD, default=NINGUNO)

    def __str__(self):
        return str(self.factura_clie)

class Produccion_detalle(models.Model):

    CANCELADO = 'Cancelado'
    NINGUNO = 'No Iniciado'
    PROCESO = 'En proceso'
    TERMINADO = 'Terminado'
    SALIENDO = 'Saliendo'

    PROCESOSPROD = [
        (CANCELADO, 'Cancelado'),
        (NINGUNO, 'No Iniciado'),
        (PROCESO, 'En proceso'),
        (TERMINADO, 'Terminado'),
        (SALIENDO, 'Saliendo')
    ]

    produccion = models.ForeignKey(Produccion, on_delete=models.CASCADE, null=True)
    cod_producto = models.ForeignKey(Venta_detalle, on_delete=models.CASCADE, null=True)
    estdo_produccion_prod = models.CharField(max_length=100, choices=PROCESOSPROD, default=NINGUNO)


######
# KARDEX
#####

class ProduccionProducto(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'No iniciado'),
        ('en_proceso', 'En Proceso'),
        ('completado', 'Terminado'),
    ]

    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def _str_(self):
        return f"{self.id_producto.nombre} - {self.estado}"

class KardexProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    accion = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    saldo = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)  # Fecha y hora de creación
    produccion = models.OneToOneField(ProduccionProducto, on_delete=models.CASCADE, default=None, null=True, blank=True)
    motivo = models.TextField(null=True, blank=True)
    def _str_(self):
        return f"{self.producto.nombre} - {self.accion}"