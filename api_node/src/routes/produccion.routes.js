import {
    Router
} from 'express'
import {
    getProduccion,
    getProduccionDetail,
    postProduccion,
    deleteProduccion,
    patchProduccion,
    getProduccionDetalle,
    deleteProduccionDetalle,
    patchProduccionDetalle,
    getDetalle,
    postProduccionDetalle
} from '../controllers/produccion.controller.js'

const router = Router()

router.get('/api/produccion/', getProduccion)
router.get('/api/produccion/:id/', getProduccionDetail)
router.post('/api/produccion/', postProduccion)
router.patch('/api/produccion/:id/', patchProduccion)
router.delete('/api/produccion/:id/', deleteProduccion)
router.get('/api/produccion/det/:id/', getProduccionDetalle)
router.patch('/api/produccion/det/:id/', patchProduccionDetalle)
router.delete('/api/produccion/det/:id/', deleteProduccionDetalle)
router.get('/api/produccion/det/:id/', getDetalle)
router.post('/api/produccion/det/', postProduccionDetalle)

export default router