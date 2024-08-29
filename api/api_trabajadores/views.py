from api_models.models import Trabajador
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class TrabajadorView(APIView):
    
    def get(self, request):
        dataTrabajador = Trabajador.objects.all()
        serTrabajador = TrabajadorSerializer(dataTrabajador, many=True)
        context = {
            'status':True,
            'content':serTrabajador.data
        }
        return Response(context)
    
    def post(self, request):
        serTrabajador = TrabajadorSerializer(data=request.data)
        serTrabajador.is_valid(raise_exception=True)
        serTrabajador.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serTrabajador.data
        }
        return Response(context)

# @permission_classes([IsAuthenticated])
class TrabajadorViewDetalle(APIView):

    def get(self, request, id):
        dataTrabajador = Trabajador.objects.all().get(id=id)
        serTrabajador = TrabajadorSerializer(dataTrabajador)
        context = {
            'status':True,
            'content':serTrabajador.data,
        }
        return Response(context)

    def put(self, request, id):
        dataTrabajador = Trabajador.objects.all().get(id=id)
        serTrabajador = TrabajadorSerializer(dataTrabajador, data=request.data)
        if serTrabajador.is_valid():
            serTrabajador.save()
            context = {
                'status':True,
                'content':serTrabajador.data,
                'status':status.HTTP_202_ACCEPTED
            }
        else:
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
        return Response(context)
    
    def patch(self, request, id ):
        dataTrabajador = Trabajador.objects.all().get(id=id)
        serTrabajador = TrabajadorSerializer(dataTrabajador, data=request.data, partial=True)
        if serTrabajador.is_valid():
            serTrabajador.save()
            context = {
                'status':True,
                'content':serTrabajador.data,
                'status':status.HTTP_202_ACCEPTED
            }
        else:
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
        return Response(context)

    
    def delete(self, request, id):
        dataTrabajador = Trabajador.objects.all().get(id=id) 
        serTrabajador = TrabajadorSerializer(dataTrabajador)
        dataTrabajador.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serTrabajador.data
        }
        return Response(context) 
