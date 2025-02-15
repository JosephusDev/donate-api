import { Router } from 'express'
import { getBloodType } from '../controllers/bloodType'

const router = Router()

router.get('/', getBloodType)

export default router
