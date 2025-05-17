import { Router } from 'express'
import { getDonates } from '../controllers/Donate'

const router = Router()

router.get('/:id', getDonates)

export default router
