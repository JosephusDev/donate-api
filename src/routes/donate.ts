import { Router } from 'express'
import { getDonates } from '../controllers/Donate.ts'

const router = Router()

router.get('/:id', getDonates)

export default router
