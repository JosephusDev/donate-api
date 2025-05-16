import { Router } from 'express'
import { getBloodType } from '../controllers/bloodtype'

const router = Router()

router.get('/', getBloodType)

export default router
