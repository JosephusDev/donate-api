import { Router } from 'express'
import { createMessage, deleteMessage, getMessages } from '../controllers/chat'

const router = Router()

router.post('/', createMessage)
router.get('/:id', getMessages)
router.delete('/:id', deleteMessage)

export default router
