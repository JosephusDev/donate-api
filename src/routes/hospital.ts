import { Router } from 'express'
import { getHospitalsList } from '../controllers/Donate'

const router = Router()

router.get('/', getHospitalsList)

export default router
