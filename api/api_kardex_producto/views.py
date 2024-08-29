from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api_models.models import Producto, KardexProducto
from .serializers import ProductoSerializer, KardexProductoSerializer

@api_view(['GET'])
def obtener_kardex_producto(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    kardex_producto = KardexProducto.objects.filter(producto=producto)

    serializer = KardexProductoSerializer(kardex_producto, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def realizar_accion(request):
    if request.method == 'POST':
        serializer = KardexProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def obtener_todos_kardex_producto(request):
    try:
        kardex_producto = KardexProducto.objects.all()
        serializer = KardexProductoSerializer(kardex_producto, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def obtener_nuevo_saldo(producto_id, cantidad):
    # Obtener el último registro del kardex para el producto dado
    ultimo_registro = KardexProducto.objects.filter(producto_id=producto_id).order_by('-id').first()

    # Calcular el nuevo saldo basado en el último registro y la cantidad actual
    if ultimo_registro:
        nuevo_saldo = ultimo_registro.saldo - cantidad
    else:
        nuevo_saldo = -cantidad  # Si no hay registros anteriores, la cantidad actual se convierte en el saldo inicial

    return nuevo_saldo