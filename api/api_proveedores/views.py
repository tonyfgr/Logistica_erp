from api_models.models import Proveedores
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# @permission_classes([IsAuthenticated])
class ProveedorPersonaView(APIView):
    
    def get(self, request):
        dataProveedores = Proveedores.objects.filter(borrado=False).filter(empresa=None)
        serProveedores = ProveedorPersonaSerializer(dataProveedores, many=True)
        context = {
            'status':True,
            'content':serProveedores.data
        }
        return Response(context)
    
    def post(self, request):
        serProveedores = ProveedorPersonaSerializer(data=request.data)
        serProveedores.is_valid(raise_exception=True)
        serProveedores.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serProveedores.data
        }
        return Response(context)

# @permission_classes([IsAuthenticated])
class ProveedorPersonaViewDetalle(APIView):

    def get(self, request, id):
        dataProveedores = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedores = ProveedorPersonaSerializer(dataProveedores)
        context = {
            'status':True,
            'content':serProveedores.data,
        }
        return Response(context)

    def put(self, request, id):
        dataProveedor = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedor = ProveedorPersonaSerializer(dataProveedor, data=request.data)
        if serProveedor.is_valid():
            serProveedor.save()
            context = {
                'status':True,
                'content':serProveedor.data,
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
        dataProveedor = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedor = ProveedorPersonaSerializer(dataProveedor, data=request.data,
                                            partial=True)
        if serProveedor.is_valid():
            serProveedor.save()
            context = {
                'status':True,
                'content':serProveedor.data,
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
        dataProveedores = Proveedores.objects.filter(borrado=False).get(id=id) 
        serProveedores = ProveedorPersonaSerializer(dataProveedores)
        dataProveedores.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serProveedores.data
        }
        return Response(context) 

# @permission_classes([IsAuthenticated])
class ProveedorEmpresaView(APIView):
    
    def get(self, request):
        dataProveedores = Proveedores.objects.filter(borrado=False).filter(persona=None)
        serProveedores = ProveedorEmpresaSerializer(dataProveedores, many=True)
        context = {
            'status':True,
            'content':serProveedores.data
        }
        return Response(context)
    
    def post(self, request):
        serProveedores = ProveedorEmpresaSerializer(data=request.data)
        serProveedores.is_valid(raise_exception=True)
        serProveedores.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serProveedores.data
        }
        return Response(context)

# @permission_classes([IsAuthenticated])
class ProveedorEmpresaViewDetalle(APIView):

    def get(self, request, id):
        dataProveedores = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedores = ProveedorEmpresaSerializer(dataProveedores)
        context = {
            'status':True,
            'content':serProveedores.data,
        }
        return Response(context)

    def put(self, request, id):
        dataProveedor = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedor = ProveedorEmpresaSerializer(dataProveedor, data=request.data)
        if serProveedor.is_valid():
            serProveedor.save()
            context = {
                'status':True,
                'content':serProveedor.data,
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
        dataProveedor = Proveedores.objects.filter(borrado=False).get(id=id)
        serProveedor = ProveedorEmpresaSerializer(dataProveedor, data=request.data,
                                            partial=True)
        if serProveedor.is_valid():
            serProveedor.save()
            context = {
                'status':True,
                'content':serProveedor.data,
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
        dataProveedores = Proveedores.objects.filter(borrado=False).get(id=id) 
        serProveedores = ProveedorEmpresaSerializer(dataProveedores)
        dataProveedores.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serProveedores.data
        }
        return Response(context) 