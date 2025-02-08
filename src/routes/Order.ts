import { Router } from 'express'
import { create, deleteAnOrder, getOrders, update, getOrderNotifications, getUserOrders } from '../controllers/Order'

const router = Router()

router.post('/', create)
router.get('/', getOrders)
router.get('/:id', getUserOrders)
router.put('/:id', update)
router.delete('/:id', deleteAnOrder)
router.get('/notifications/:id', getOrderNotifications)

export default router
