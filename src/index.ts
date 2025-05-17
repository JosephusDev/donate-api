import express from 'express'
import cors from 'cors'
import donateRoutes from './routes/donate'
import chatRoutes from './routes/chat'
import { authenticateToken } from './middleware/Authentication'
import userRoutes from './routes/User'
import orderRoutes from './routes/Order'
import bloodTypeRoutes from './routes/blood_type'

const app = express()

// Configuração básica
app.use(express.json())
app.use(cors())

// Rotas públicas
app.use('/user', userRoutes)

// Rotas privadas
app.use('/order', authenticateToken, orderRoutes)
app.use('/bloodtypes', authenticateToken, bloodTypeRoutes)
app.use('/donates', authenticateToken, donateRoutes)
app.use('/chat', authenticateToken, chatRoutes)

export default app
