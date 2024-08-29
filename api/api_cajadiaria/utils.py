import requests

def obtener_tipo_cambio_dolar():
    url = 'https://api.apis.net.pe/v1/tipo-cambio-sunat'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        tipo_cambio = data['venta']
        return tipo_cambio
    else:
        # Manejar el error de la solicitud
        print('Error al obtener el tipo de cambio:', response.status_code)
        return None