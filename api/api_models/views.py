from django.shortcuts import render
from django.http import HttpResponse
import csv
# Create your views here.

from .models import * 

def export_csv(request):
    queryset = Clientes.objects.all()
    options = Clientes._meta
    fields = [field.name for field in options.fields]

    # buid response
    response = HttpResponse(content_type='text/csv')
    response ['Content-Disposition'] = 'attachment; filename="clientes.csv"'
    
    # writer
    writer = csv.writer(response)
    #writing header
    writer.writerow([options.get_field(field).verbose_name for field in fields])
    #writing data
    for obj in queryset:
        writer.writerow([getattr(obj, field) for field in fields])

    return response