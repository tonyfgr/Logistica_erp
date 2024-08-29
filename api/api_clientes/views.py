from django.shortcuts import render

#Import models
from api_models.models import (
    Clientes
)
#Import serializer
from .serializers import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.

# @permission_classes([IsAuthenticated])
class ClientePersonaView(APIView):
    def get(self, request):
        dataCliente = Clientes.objects.filter(borrado=False).filter(empresa=None)
        serCliente = ClientePersonaSerilizer(dataCliente, many=True)
        context = {
            'status':True,
            'content':serCliente.data
        }
        return Response(context)
    
    def post(self, request):    
        serCliente = ClientePersonaSerilizer(data=request.data)
        
        if serCliente.is_valid():
            serCliente.save()
            context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serCliente.data
            }
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST,
            }
            return Response(context)

# @permission_classes([IsAuthenticated])
class ClientePersonaViewDetalle(APIView):
    def get(self, request, id):
        dataCliente = Clientes.objects.filter(borrado=False).get(pk=id)
        print(dataCliente)
        serializer = ClientePersonaSerilizer(dataCliente)
        context = {
            'status':True,
            'content':serializer.data,
        }
        return Response(context)

    def put(self, request, id):
        dataCliente = Clientes.objects.filter(borrado=False).get(id=id)
        serializer = ClientePersonaSerilizer(dataCliente, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':True,
                'content':serializer.data,
                'status':status.HTTP_202_ACCEPTED
            }
            return Response(context)
        else:
            serializer.save()
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):

        dataCliente = Clientes.objects.filter(borrado=False).get(id=id) 
        serializer = ClientePersonaSerilizer(dataCliente)
        dataCliente.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context)

# @permission_classes([IsAuthenticated])
class ClienteEmpresaView(APIView):
    def get(self, request):
        dataCliente = Clientes.objects.filter(borrado=False).filter(persona=None)
        serCliente = ClienteEmpresaSerilizer(dataCliente, many=True)
        context = {
            'status':True,
            'content':serCliente.data
        }
        return Response(context)   
    def post(self, request):    
        serCliente = ClienteEmpresaSerilizer(data=request.data)
        
        if serCliente.is_valid():
            serCliente.save()
            context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serCliente.data
            }
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST,
            }
            return Response(context)

# @permission_classes([IsAuthenticated])
class ClienteEmpresaViewDetalle(APIView):
    def get(self, request, id):
        dataCliente = Clientes.objects.filter(borrado=False).get(pk=id)
        serializer = ClienteEmpresaSerilizer(dataCliente)
        print(dataCliente)
        context = {
            'status':True,
            'content':serializer.data,
        }
        return Response(context)

    def put(self, request, id):
        dataCliente = Clientes.objects.filter(borrado=False).get(id=id)
        serializer = ClienteEmpresaSerilizer(dataCliente, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':True,
                'content':serializer.data,
                'status':status.HTTP_202_ACCEPTED
            }
            return Response(context)
        else:
            serializer.save()
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):
        dataCliente = Clientes.objects.filter(borrado=False).get(pk=id) 
        serializer = ClienteEmpresaSerilizer(dataCliente)
        dataCliente.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context)
