import { Router } from 'express'
import { getBloodType } from '../controllers/blood_type.ts'

const router = Router()

router.get('/', getBloodType)

export default router
