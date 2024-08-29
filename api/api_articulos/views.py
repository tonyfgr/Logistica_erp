from django.shortcuts import render

from .serializers import *
from api_models.models import *


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.parsers import JSONParser
from io import BytesIO
from django.http.request import QueryDict


def querydict_to_dict(querydict):
    def get_value(value):
        try:
            return int(value)
        except ValueError:
            pass
        try:
            return float(value)
        except ValueError:
            pass
        return value

    data = {}
    for key, value in querydict.items():
        if 'variantes' in key:
            var_attr = key.split('[')[-1][:-1]
            if 'variantes' not in data:
                data['variantes'] = []
            if not data['variantes']:
                data['variantes'].append({})
            if var_attr in data['variantes'][-1]:
                data['variantes'].append({})
            data['variantes'][-1][var_attr] = get_value(value)
            data['variantes'][-1] = {k: v for k, v in data['variantes'][-1].items() if v != ''}
        elif key == 'imagen':
            data[key] = value
        else:
            data[key] = get_value(value)
    return data




class ArticulosView(APIView):
    def get(self, request):
        dataArticulo = Articulo.objects.filter(borrado=False)
        serializer = ArticuloSerializer(dataArticulo, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def post(self, request):
        print(request.data)
        print(querydict_to_dict(request.data))
        try:
            serializer = ArticuloSerializer(data=querydict_to_dict(request.data))
            serializer.is_valid(raise_exception=True)
            serializer.save()
            context = {
                    'data':'OK',
                    'status':status.HTTP_201_CREATED,
                    'content':serializer.data
            }
            return Response(context)
        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            })


class ArticuloDetailView(APIView):
    def get(self, request, id):
        dataArticulo = Articulo.objects.filter(borrado=False).get(pk=id)
        serializer = ArticuloSerializer(dataArticulo)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def patch (self, request, id):
        print(request.data)
        data = Articulo.objects.filter(borrado=False).get(id=id)
        serializer = ArticuloSerializer(data, data= request.data,
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
        data = Articulo.objects.filter(borrado=False).get(id=id)
        serializer = ArticuloSerializer(data)
        if data.imagen.name != 'blancos.png':
            data.imagen.delete()
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context) 


class ArticuloVarianteView(APIView):

    def get(self, request):
        data = ArticuloVariante.objects.all()
        serializer = ArticuloVarianteSerializer(data, many=True)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)
    
    def post(self, request):
        serializer = ArticuloVarianteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        context = {
                'data':'OK',
                'status':status.HTTP_201_CREATED,
                'content':serializer.data
        }
        return Response(context)

class ArticuloVarianteDetailView(APIView):
    def get(self, request, id):
        data = ArticuloVariante.objects.get(id=id)
        serializer = ArticuloVarianteSerializer(data)
        context = {
            'status':True,
            'content':serializer.data
        }        
        return Response(context)

    def patch (self, request, id):
        print(request.data)
        data = ArticuloVariante.objects.get(id=id)
        serializer = ArticuloVarianteSerializer(data, data= request.data,
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
        data = ArticuloVariante.objects.get(id=id)
        articulo_id = data.articulo.pk
        isOne = ArticuloVariante.objects.filter(articulo=articulo_id)
        if len(isOne)<2:
            context = {
                'status':False,
                'message':'There has to be always ONE variante',
            }
            return Response(context)
        serializer = ArticuloVarianteSerializer(data)
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':serializer.data
        }
        return Response(context) 