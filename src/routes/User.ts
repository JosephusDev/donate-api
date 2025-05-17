import { Router, Request, Response } from 'express'
import { create, login, update } from '../controllers/User'

const router = Router()

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello World' })
})
router.post('/', create)
router.post('/login', login)
router.put('/update/:id', update)

export default router
