import { Router } from 'express'
import { create, deleteAnOrder, getOrders, update, getOrderNotifications, getUserOrders } from '../controllers/Order'
import { authenticateToken } from '../middleware/Authentication'

const router = Router()

router.post('/', authenticateToken, create)
router.get('/', getOrders)
router.get('/:id', authenticateToken, getUserOrders)
router.put('/:id', authenticateToken, update)
router.delete('/:id', authenticateToken, deleteAnOrder)
router.get('/notifications/:id', authenticateToken, getOrderNotifications)

export default router
