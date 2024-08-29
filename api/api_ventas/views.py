from django.shortcuts import render
from api_models.models import *
from .serializers import *

from api_cajadiaria.models import Caja_Diaria
from api_cajadiaria.serializers import IngresosVentaSerializer, IngresosSesionVentaSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class VentasView(APIView):
    def get(self, request):
        dataVentas = Venta.objects.all()
        serializer = VentaSerializer(dataVentas, many=True)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def post(self, request):
        ultima_caja = Caja_Diaria.objects.last()
        estado_ultima_caja = ultima_caja.estado_caja
        data_ingreso_venta = request.data.pop("ingreso_venta")
        print("data_ingreso_venta ==> ", data_ingreso_venta)

        if estado_ultima_caja:
            serializer = VentaSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Restar la cantidad vendida del Kardex del Producto
            detalle_venta = request.data.get('detalle_venta', [])
            for detalle in detalle_venta:
                producto_id = detalle.get('producto')
                cantidad_vendida = detalle.get('cantidad')
                nuevo_saldo = obtener_nuevo_saldo(producto_id, cantidad_vendida)
                
                # Obtener la producción asociada con la venta
                # (reemplaza esta lógica con la correcta según tu aplicación)
                produccion_id = None  # Reemplaza con la lógica para obtener el ID de la producción

                # Crear una nueva instancia de KardexProducto para registrar la venta
                kardex_producto = KardexProducto.objects.create(
                    producto_id=producto_id,
                    accion='salida',
                    cantidad=cantidad_vendida,
                    saldo=nuevo_saldo,
                    produccion_id=produccion_id,# Reemplaza 'produccion_id' con el ID válido de la producción asociada
                    motivo='venta'  
                )


            # Codigo original
            data_ingreso_venta["venta"] = serializer.data.get("id")            
            serializer_ingreso_venta = IngresosVentaSerializer(data=data_ingreso_venta)
            serializer_ingreso_venta.is_valid(raise_exception=True)
            serializer_ingreso_venta.save()

            context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }

            print("serializer.data ==> ", serializer.data)
        else: 
            context = {
                'data': 'ERROR',
                'status': status.HTTP_400_BAD_REQUEST,
                'content': 'Debes abrir una caja antes de hacer la compra'
            }

        return Response(context)




from api_kardex_producto.views import obtener_nuevo_saldo
def registrar_venta(request):
    if request.method == 'POST':
        # Obtener los datos de la venta del formulario o la solicitud POST
        producto_id = request.POST.get('producto_id')  # Aquí debes obtener el ID del producto vendido
        cantidad_vendida = request.POST.get('cantidad_vendida')  # Aquí debes obtener la cantidad vendida

        # Calcular el nuevo saldo del kardex para el producto vendido
        nuevo_saldo = obtener_nuevo_saldo(producto_id, cantidad_vendida)


class VentasDetailView(APIView):
    def get(self, request, id):
        data = Venta.objects.get(id=id)
        serializer = VentaSerializer(data)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def patch(self, request, id):
        data = Venta.objects.get(id=id)
        serializer = VentaSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        return Response(context)
    
    def delete(self, request, id):
        data = Venta.objects.get(id=id)
        data.borrado = not data.borrado
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 
    


class Sesion_ventaView(APIView):
    def get(self, request):
        sesion_data = Sesion_venta.objects.all()
        serializer = SesionVentaSerializer(sesion_data, many=True)
        context = {
           'status': True,
            'content': serializer.data
        }
        return Response(context)

    def post(self, request):
        ultima_caja = Caja_Diaria.objects.last()
        estado_ultima_caja = ultima_caja.estado_caja
        data_ingreso_sesion_venta = request.data.pop("ingreso_sesion_venta")
        print("data_ingreso_sesion_venta ==> ", data_ingreso_sesion_venta)

        if estado_ultima_caja:
            serializer = SesionVentaSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            data_ingreso_sesion_venta["sesion_venta"] = serializer.data.get("id")            
            serializer_ingreso_venta = IngresosSesionVentaSerializer(data=data_ingreso_sesion_venta)
            serializer_ingreso_venta.is_valid(raise_exception=True)
            serializer_ingreso_venta.save()

            print("serializer.data ==> ", serializer.data)
        else: 
            context = {
                'data': 'ERROR',
                'status': status.HTTP_400_BAD_REQUEST,
                'content': 'Debes abrir una caja antes de hacer la compra'
            }

        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class Sesion_ventaDetailView(APIView):
    def get(self, request, id):
        data = Sesion_venta.objects.get(id=id)
        serializer = SesionVentaSerializer(data)
        context = {
           'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def patch(self, request, id):
        data = Sesion_venta.objects.get(id=id)
        serializer = SesionVentaSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        return Response(context)
    
    def delete(self, request, id):
        data = Sesion_venta.objects.get(id=id)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 

class Punto_ventaView(APIView):
    def get(self, request):
        data = Punto_venta.objects.all()
        serializer = PuntoVentaSerializer(data, many=True)
        context = {
           'status': True,
            'content': serializer.data
        }
        return Response(context)

    def post(self, request):
        serializer = PuntoVentaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class Punto_ventaDetailView(APIView):
    def get(self, request, id):
        data = Punto_venta.objects.get(id=id)
        serializer = PuntoVentaSerializer(data)
        context = {
           'status': True,
            'content': serializer.data
        }
        return Response(context)
    
    def patch(self, request, id):
        data = Punto_venta.objects.get(id=id)
        serializer = PuntoVentaSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        return Response(context)
    
    def delete(self, request, id):
        data = Punto_venta.objects.get(id=id)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context) 

class RemisionesView(APIView):
    def get(self, request):
        dataRemisiones = Remision_venta.objects.all()
        serializer = RemisionesSerializer(dataRemisiones, many=True)
        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

    def post(self, request):
        venta_id = request.data.pop('venta')
        
        remision = Remision_venta()
        remision.venta_id = venta_id
        remision.save()

        lista_detalles_remision = request.data.get('remision_venta_detalle')
        for item in lista_detalles_remision:
            venta_detalle = Venta_detalle.objects.get(id=item["venta_detalle"])
            venta_detalle.remision_hecha = True
            venta_detalle.save()
            
            detalle_remision = Remision_venta_detalle()
            detalle_remision.remision_venta=remision
            detalle_remision.venta_detalle=venta_detalle
            print(detalle_remision)
            detalle_remision.save()

# ////////////////////////

            # entrada_almacen = EntradaAlmacenCompra.objects.create(remision=detalle_remision)
            # entrada_almacen.save()
        
        venta = remision.venta
        serVenta = VentaSerializer(venta)
        context = {
            'status':True,
            'content':serVenta.data
        }

        return Response(context)

class RemisionDetailView(APIView):
    def delete(self, request, id):
        data = Remision_venta.objects.get(id=id)
        for detalle_remision in data.remision_venta_detalle.all():
            venta_detalle = detalle_remision.venta_detalle
            venta_detalle.remision_hecha = False
            venta_detalle.save()
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
        }
        return Response(context)

class RemisionDetalleDetailView(APIView):

    def delete(self, request, id):

        data = Remision_venta_detalle.objects.get(id=id)
        totalRemsiones = Remision_venta_detalle.objects.filter(remision_venta = data.remision_venta.id)
        if len(totalRemsiones) == 1:
           remision = data.remision_venta
           remision.delete()
        venta_detalle = data.venta_detalle
        venta_detalle.remision_hecha = False
        venta_detalle.save()
        data.delete()
        
        context = {
            'status':True,
            'message':'Delete succes',
            
        }
        return Response(context)

class SalidaProductos(APIView):  
    def get (self, request, productoid, almacenid):
        data = Ubicacion_almacen_producto.objects.filter(producto_variante = productoid).filter(almacen = almacenid).first()
        serializer = SalidaProductoSerializer(data)
        context = {
                'data':'OK',
                'content':serializer.data
        }
        return Response(context)

    def patch(self, request, productoid, almacenid):
        data = Ubicacion_almacen_producto.objects.filter(producto_variante = productoid).filter(almacen = almacenid).first()
        serializer_data = SalidaProductoSerializer(data)
        print('//////////////////////////////////')
        # print(producto_variante)
        print(serializer_data.data)
        print('//////////////////////////////////')
        print(request.data['cantidad'])
        print('//////////////////////////////////')
        result = serializer_data.data['cantidad'] - request.data['cantidad']
        serializer = SalidaProductoSerializer(data, data={"cantidad":result}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_202_ACCEPTED,
                'content':serializer.data
        }
        return Response(context)