from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import * 
from .models import *

def get_value(value):
    if isinstance(value, (str, int, float)):
        try:
            return int(value)
        except ValueError:
            pass
        try:
            return float(value)
        except ValueError:
            pass
    return value

def add_to_dict(d, keys, value):
    if len(keys) == 1:
        d[keys[0]] = value
    else:
        key = keys[0]
        if key not in d:
            if keys[1].isdigit():
                d[key] = []
            else:
                d[key] = {}
        if keys[1].isdigit():
            index = int(keys[1])
            if len(d[key]) <= index:
                d[key] += [{}] * (index + 1 - len(d[key]))
            add_to_dict(d[key][index], keys[2:], value)
        else:
            add_to_dict(d[key], keys[1:], value)


def querydict_to_dict(query_dict):
    d = {}
    keys = []
    for key, value in query_dict.items():
        if '[' in key:
            var_attr = key.split('[')
            newKeys = []
            for i in var_attr:
                i = i.replace("]", "")
                newKeys.append(i)
            del var_attr
            add_to_dict(d, newKeys, get_value(value))
        else:
            d[key] = get_value(value)
    print(d)
    return d


# Create your views here.
class OrdenBienView(APIView):
    def get(self, request):
        orden_bien = Orden_bien.objects.all()
        serializer = OrdenBienSerializer(orden_bien, many=True)
        
        context = {
            'status':True,
            'content':serializer.data
        }        
        
        return Response(context)

    def post(self, request):
        print("rq ==> ", request.data)
        print("qd ==> ", querydict_to_dict(request.data))

        serializer = OrdenBienSerializer(data=querydict_to_dict(request.data))
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }
        
        return Response(context)
        
class OrdenBienDetailView (APIView):

    def delete(self, request, id):
        data = Orden_bien.objects.get(id=id)
        content = OrdenBienSerializer(data).data
        for item in data.orden_bien.all():
            item.propuesta_documentos_bien.propuesta_tecnica_documento.delete()
            item.propuesta_documentos_bien.propuesta_economica_documento.delete()
            item.propuesta_documentos_bien.bien_cotizacion_documento.delete()
        data.delete()
        context = {
            'status':True,
            'message':'Delete succes',
            'content':content
        }
        return Response(context)

    def patch(self, request, id):
        data = Orden_bien.objects.get(id=id)
        serializer = OrdenBienSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)


class OrdenServicioView(APIView):
    def get(self, request):
        orden_servicio = Orden_servicio.objects.all()
        serializer = OrdenServicioSerializer(orden_servicio, many=True)

        context = {
            'status':True,
            'content':serializer.data
        } 

        return Response(context)

    def post(self, request):
        print(request.data)
        print(querydict_to_dict(request.data))

        serializer = OrdenServicioSerializer(data=querydict_to_dict(request.data))
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data':'OK',
            'status':status.HTTP_201_CREATED,
            'content':serializer.data
        }

        return Response(context)

class OrdenServicioDetailView(APIView):
    def delete(self, request, id):
        data = Orden_servicio.objects.get(id=id)
        content = OrdenServicioSerializer(data).data
        for i in data.orden_servicio.all():
            i.propuesta_documentos_servicio.propuesta_tecnica_documento.delete()
            i.propuesta_documentos_servicio.propuesta_economica_documento.delete()
            i.propuesta_documentos_servicio.servicio_cotizacion_documento.delete()
        data.delete()

        context = {
            'status':True,
            'message':'Delete succes',
            'content':content
        }

        return Response(context)

    def patch(self, request, id):
        data = Orden_servicio.objects.get(id=id)
        serializer = OrdenServicioSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)
    
class PropuestaEmpresaBienDocumentosDetailView(APIView):
    def patch(self, request, id):
        data = Propuesta_Empresa_Bien.objects.get(id=id)
        serializer = PropuestaEmpresaBienSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)

class PropuestaEmpresaServicioDocumentosDetailView(APIView):
    def patch(self, request, id):
        data = Propuesta_Empresa_Servicio.objects.get(id=id)
        serializer = PropuestaEmpresaServicioSerializer(data, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)