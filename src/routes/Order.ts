import { Router } from 'express'
import { create, deleteAnOrder, getOrders, update } from '../controllers/Order'

const router = Router()

router.post('/', create)
router.get('/', getOrders)
router.put('/:id', update)
router.delete('/:id', deleteAnOrder)

export default router
