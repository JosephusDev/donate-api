import { Router } from 'express'
import { create, login, update } from '../controllers/User.ts'

const router = Router()

router.post('/', create)
router.post('/login', login)
router.put('/update/:id', update)

export default router
