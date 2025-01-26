import { Router } from 'express'
import { create } from '../controllers/User'

const router = Router()

router.post('/', create)

export default router
