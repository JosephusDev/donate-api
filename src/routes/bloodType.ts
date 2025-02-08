import { Router } from 'express'
import { getBloodType } from '../controllers/BloodType'

const router = Router()

router.get('/', getBloodType)

export default router
