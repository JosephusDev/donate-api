import { Router } from 'express'
import { getBloodType } from '../controllers/bloodtype.ts'

const router = Router()

router.get('/', getBloodType)

export default router
