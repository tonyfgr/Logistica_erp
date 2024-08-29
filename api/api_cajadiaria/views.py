from . serializers import *
from . models import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .utils import obtener_tipo_cambio_dolar
from django.http import JsonResponse

class CajaDiariaView(APIView):
    def get(self, request):
        data = Caja_Diaria.objects.all()
        serializer = RegistrosCajaSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)
    
    def post(self, request):
        last_caja = Caja_Diaria.objects.last()
        if last_caja:
            request.data['monto_inicial'] = last_caja.monto_final
        else:
            request.data['monto_inicial'] = 0
            
        serializer = CajaDiariaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        
        return Response(context)

class UltimaCajaView(APIView):
    def get(self, request):
        try:
            last_caja = Caja_Diaria.objects.last()
            
            if last_caja != None:
                serializer = RegistrosCajaSerializer(last_caja)
                context = {
                    'status': True,
                    'content': serializer.data 
                }
            else:
                serializer = "No hay ninguna caja registrada"
                context = {
                    'status': False,
                    'content': serializer 
                }

        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            }) 

        return Response(context)

class CajaDiariaDetailView(APIView):
    def get(self, request, id):
        data = Caja_Diaria.objects.get(id=id)
        serializer = RegistrosCajaSerializer(data)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)
    
    def patch(self, resquest, id):
        dataCaja = Caja_Diaria.objects.get(id=id)
        resquest.data["monto_final"] = dataCaja.monto_actual
        serializer = CajaDiariaSerializer(dataCaja, data=resquest.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)

    def delete(self, request, id):
        data = Caja_Diaria.objects.get(id=id)
        data.delete()
        
        context = {
            'status':True,
            'message':'Delete success',
        }
        
        return Response(context)

class CajaCompraVentaView(APIView):
    def get(self, request, tipo):
        data = Caja_Diaria.objects.last()

        if tipo == "tesoreria":
            serializer = RegistrosCajaSerializer(data)
            
        else:
            serializer = CajaDiariaSerializer(data)

        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

class IngresoVentaView(APIView):
    def get(self, request):
        data = Ingreso_Venta.objects.all()
        serializer = IngresosVentaSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        serializer = IngresosVentaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)

class IngresosOtrosView(APIView):
    def get(self, request):
        data = Ingresos_Otros.objects.all()
        serializer = IngresosOtrosSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        serializer = IngresosOtrosSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)

class EgresosCompraView(APIView):
    def get(self, request):
        data = Egresos_Compra.objects.all()
        serializer = EgresosCompraSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        print(request.data)
        serializer = EgresosCompraSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)
    
class EgresosOtrosView(APIView):
    def get(self, request):
        data = Egresos_Otros.objects.all()
        serializer = EgresosOtrosSerializer(data, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        serializer = EgresosOtrosSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)

def tipo_cambio_dolar_view(request):
    tipo_cambio = obtener_tipo_cambio_dolar()
    
    if tipo_cambio is not None:
        data = {
            'tipo_cambio': tipo_cambio
        }
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Error al obtener el tipo de cambio'}, status=500)
