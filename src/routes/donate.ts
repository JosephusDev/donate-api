import { Router } from 'express'
import { getDonates } from '../controllers/donate'

const router = Router()

router.get('/', getDonates)

export default router
