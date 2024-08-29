from django.shortcuts import render

#Import Models
from api_models.models import (
   Articulo, ArticuloVariante, Producto, Producto_detalle, Producto_variante
)
# Create your views here.

from .serializers import *

from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import JSONParser
from io import BytesIO
from django.http.request import QueryDict
from django.core.files.uploadedfile import InMemoryUploadedFile



def parse_querydict(query_dict):
    result = {}
    for key, value in query_dict.lists():
        parts = key.split('.')
        current = result
        for i, part in enumerate(parts):
            if '[' in part and ']' in part:
                index_start = part.index('[')
                index_end = part.index(']')
                index = part[index_start+1:index_end]
                part = part[:index_start]
                if part not in current:
                    current[part] = []
                while len(current[part]) <= int(index):
                    current[part].append({})
                if i == len(parts) - 1:
                    if isinstance(value[0], str):
                        current[part][int(index)] = value[0] if not value[0].isdigit() else int(value[0]) if '.' not in value[0] else float(value[0])
                    else:
                        current[part][int(index)] = value[0]
                else:
                    current = current[part][int(index)]
            else:
                if i == len(parts) - 1:
                    if isinstance(value[0], str):
                        current[part] = value[0] if not value[0].isdigit() else int(value[0]) if '.' not in value[0] else float(value[0])
                    else:
                        current[part] = value[0]
                elif isinstance(value, InMemoryUploadedFile):
                    current[key] = value        
                else:
                    if part not in current:
                        current[part] = {}
                    current = current[part]
    print(result)
    return result

# @permission_classes([IsAuthenticated])
class ProductoView(APIView):
    parse_classes = [MultiPartParser, FormParser, JSONParser]
    def get(self, request):
        dataProducto = Producto.objects.filter(borrado=False)
        serProducto = ProductoSerializer(dataProducto, many=True)
        context = {
            'status':True,
            'content':serProducto.data
        }        
        return Response(context)

    def post(self, request, format=None):
        serializer = ProductoSerializer(data = parse_querydict(request.data))
        # serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        # try:
        #     serializer = ProductoSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         context = {
        #             'data':'OK',
        #             'status':status.HTTP_201_CREATED,
        #             'content':serializer.data
        #         }
        #         return Response(context)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as Error:
        #     print(Error)
        #     return Response({
        #         'status': False,
        #         'content': 'Error',
        #         'message': 'Internal server error'
        #     })             

# @permission_classes([IsAuthenticated])
class ProductoDetailView(APIView):
    def get(self, request, id):
        dataProduco = Producto.objects.filter(borrado=False).get(pk=id)
        serializer = ProductoSerializer(dataProduco)
        context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }
        return Response(context)
    
    def patch(self, request, id):
        print(request.data)
        data = Producto.objects.filter(borrado=False).get(id=id)
        serializer = ProductoSerializer(data, data= request.data,
                                              partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':True,
                'content':serializer.data,
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
        dataProducto = Producto.objects.filter(borrado=False).get(pk=id)
        serializer = ProductoSerializer(dataProducto)
        dataProducto.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_varianteView(APIView):
    def get(self, request):
        dataProductoVariante = Producto_variante.objects.filter(borrado=False)
        serializer = Producto_varianteSerializer(dataProductoVariante, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def post(self, request):
        try:
            serializer = Producto_varianteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                context = {
                    'data':'OK',
                    'status':status.HTTP_201_CREATED,
                    'content':serializer.data
                }
                return Response(context)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as Error:
            print(Error)
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'content': 'Error',
                'message': 'Internal server error'
            }) 

# @permission_classes([IsAuthenticated])
class Producto_varianteDetailView(APIView):

    def post(self, request, id):
        dataProducto_variante = Producto_variante.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_varianteSerializer(dataProducto_variante, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }    
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def patch(self, request, id):
        dataProducto_variante = Producto_variante.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_varianteSerializer(dataProducto_variante, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }    
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):
        dataProducto_variante = Producto_variante.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_varianteSerializer(dataProducto_variante)
        dataProducto_variante.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_detallelView(APIView):

    def post(self, request):
        serializer = Producto_detalleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }
            return Response(context)
        else:
            context = {
                'data':'ERROR',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

# @permission_classes([IsAuthenticated])
class Producto_detalleDetailView(APIView):

    def patch(self, request, id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            context = {
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
            }    
            return Response(context)
        else:
            context = {
                'status':False,
                'message':'serialize error',
                'status':status.HTTP_400_BAD_REQUEST
            }
            return Response(context)

    def delete(self, request, id):
        dataProducto_detalle = Producto_detalle.objects.filter(borrado=False).get(pk=id)
        serializer = Producto_detalleSerializer(dataProducto_detalle)
        dataProducto_detalle.delete()
        context = {
            'status':status.HTTP_202_ACCEPTED,
            'message':'Delete succes',
            'content':serializer.data
        }    
        return Response(context)



