import { Router } from 'express'
import { getDonates } from '../controllers/donate'

const router = Router()

router.get('/:id', getDonates)

export default router
