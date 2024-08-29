from django.shortcuts import render
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api_models.models import Producto, ProduccionProducto
from .serializers import ProductoSerializer, ProduccionProductoSerializer
from api_models.models import KardexProducto

@api_view(['POST'])
def crear_produccion_producto(request):
    if request.method == 'POST':
        serializer = ProduccionProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def actualizar_produccion_producto(request, pk):
    try:
        produccion_producto = ProduccionProducto.objects.get(pk=pk)
    except ProduccionProducto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProduccionProductoSerializer(produccion_producto, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_produccion_producto_id(request, pk):
    try:
        produccion_producto = ProduccionProducto.objects.get(pk=pk)
    except ProduccionProducto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProduccionProductoSerializer(produccion_producto)
    return Response(serializer.data)

@api_view(['GET'])
def obtener_produccion_producto(request):
    produccion_productos = ProduccionProducto.objects.all()  # Obtén todos los detalles de producción
    serializer = ProduccionProductoSerializer(produccion_productos, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def completar_produccion(request, pk):
    try:
        produccion = ProduccionProducto.objects.get(pk=pk)
    except ProduccionProducto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if produccion.estado == 'completado':
        return Response({"message": "La producción ya está completada"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ProduccionProductoSerializer(produccion, data=request.data, partial=True)
    if serializer.is_valid():
        with transaction.atomic():
            serializer.save()
            # Crear registro en el KardexProducto
            kardex_registro = KardexProducto(
                producto=produccion.id_producto,
                accion="ingreso",
                cantidad=produccion.cantidad,
                saldo=produccion.cantidad  # Si no hay registros anteriores, el saldo es igual a la cantidad producida
            )
            kardex_registro.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)