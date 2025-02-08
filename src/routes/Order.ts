import { Router } from 'express'
import { create, deleteAnOrder, getOrders, update, getOrderNotifications } from '../controllers/Order'

const router = Router()

router.post('/', create)
router.get('/', getOrders)
router.put('/:id', update)
router.delete('/:id', deleteAnOrder)
router.get('/notifications/:id', getOrderNotifications)

export default router
