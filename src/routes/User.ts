import { Router } from 'express'
import { create, login, getDonates } from '../controllers/User'

const router = Router()

router.post('/', create)
router.post('/login', login)
router.get('/donates', getDonates)

export default router
