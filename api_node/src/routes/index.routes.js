import {Router} from 'express'
import {get} from '../controllers/index.controller.js'

const router  = Router()

router.get('/',get)

export default router