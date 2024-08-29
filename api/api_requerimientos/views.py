from . serializers import *
from . models import *

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RequerimientoView(APIView):
    def get(self, request):
        data = Requerimiento.objects.all()
        serializer = RequerimientoSerializer(data, many=True)

        context = {
            'status': True,
            'content':serializer.data
        }

        return Response(context)

    def post(self, request):
        serializer = RequerimientoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'data': 'OK',
            'status': status.HTTP_201_CREATED,
            'content': serializer.data
        }

        return Response(context)

# class RequerimientoServicioView(APIView):
#     def get(self, request):
#         data = Requerimiento.objects.all()
#         serializer = RequerimientoSerializer(data, many=True)

#         context = {
#             'status': True,
#             'content':serializer.data
#         }

#         return Response(context)

#     def post(self, request):
#         serializer = RequerimientoSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         context = {
#             'data': 'OK',
#             'status': status.HTTP_201_CREATED,
#             'content': serializer.data
#         }

#         return Response(context)

class RequerimientoDetailView(APIView):
    def get(self, request, id):
        dataReqBien = Requerimiento.objects.get(id=id)
        serializer = RequerimientoSerializer(dataReqBien)

        context = {
            'status': True,
            'contenxt': serializer.data
        }

        return Response(context)

    def delete(self, request, id):
        dataReqBien = Requerimiento.objects.get(id=id)
        dataReqBien.delete()

        context = {
            'status':True,
            'message':'Delete success',
        }
        
        return Response(context)

# class RequerimientoServicioDetailView(APIView):
#     def get(self, request, id):
#         dataReqServ = Requerimiento_Servicio.objects.get(id=id)
#         serializer = RequerimientoServicioSerializer(dataReqServ)

#         context = {
#             'status': True,
#             'contenxt': serializer.data
#         }

#         return Response(context)

#     def delete(self, request, id):
#         dataReqServ = Requerimiento_Servicio.objects.get(id=id)
#         dataReqServ.delete()

#         context = {
#             'status':True,
#             'message':'Delete success',
#         }
        
#         return Response(context)