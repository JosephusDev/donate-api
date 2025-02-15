import { Router } from 'express'
import { getDonates } from '../controllers/Donate'

const router = Router()

router.get('/', getDonates)

export default router
