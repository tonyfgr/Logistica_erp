# RD-erp

## Como inicar el proyecto

Para iniciar el proyecto usar el comando:
- `docker compose up -d`
Esto correra el compose en segundo plano
Si se quiere ver los errores que salen en la terminal
- `docker compose up`
Tener en cuenta que se veran los outputs de React y Django en la misma consola

## Comandos de manage.py y npm en doker

Para poder ejecutar un comando del proyecto es necesario:
###DJANGO
- `docker ps` -> Para ver los contenedores que estan corriendo
- Copiar el **CONTAINER_ID** de django **api-1**
- `docker exec -it [CONTAINER_ID] python manage.py [comando que se quiera realizar]`

###REACT
- `docker ps` -> Para ver los contenedores que estan corriendo
- Copiar el **CONTAINER_ID** de django **web-1**
- `docker exec -it [CONTAINER_ID] npm install [libreria que se quiera instalar]`

## Rutas
- **DJANGO:** 0.0.0.0:8000
- **REACT:** 0.0.0.0:3000
- **MYSQL:** 0.0.0.0:3306 
- **CONECTAR LOCALMENTE MYSQL:** 

    - 'Nombre de la BD': 'erp',
    - 'Usuario': 'root',
    - 'Password': 'test',
    - 'Host': '0.0.0.0',
    - 'Puerto': 3306,

## Imagen Docker Node
- `docker pull aldorama/rd-erp-web:v1`
