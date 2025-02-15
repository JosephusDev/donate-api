import { Router } from 'express'
import { create, login } from '../controllers/user'

const router = Router()

router.post('/', create)
router.post('/login', login)

export default router
