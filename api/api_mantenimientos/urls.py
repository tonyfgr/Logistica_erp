from rest_framework import routers

from .views import *

router = routers.DefaultRouter()

router.register('provincias', ProvinciasViewSet, 'provincia')
router.register('entidades', EntidadesViewSet, 'entidad')
router.register('impuestos', ImpuestosViewSet, 'impuesto')
router.register('embalajes', EmbalajesViewSet, 'embalaje')
router.register('formapago', FormaPagoViewSet, 'formapago')
router.register('categoriaarticulos', CategoriaViewSet, 'categoriaarticulos')
router.register('almacenes', AlmacenViewSet, 'almacen')
router.register('areas', AreaViewSet, 'area')
router.register('unidades', UnidadViewSet, 'unidad')
router.register('categoria_productos', Categoria_productosViewSet, 'categoria_producto')

router_mantenimiento = router.urls
