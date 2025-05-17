import { Router } from 'express'
import { createMessage, deleteMessage, getMessages, getChats } from '../controllers/chat'

const router = Router()

router.post('/', createMessage)
router.get('/:id', getChats)
router.get('/', getMessages)
router.delete('/:id', deleteMessage)

export default router
