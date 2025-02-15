import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user'
import orderRoutes from './routes/order'
import bloodTypeRoutes from './routes/bloodType'
import donateRoutes from './routes/donate'
import chatRoutes from './routes/chat'
import { authenticateToken } from './middleware/Authentication'

const app = express()

app.use(express.json())
app.use(cors())
//Public routes
app.use('/user', userRoutes)

//Private routes
app.use('/order', authenticateToken, orderRoutes)
app.use('/bloodtypes', authenticateToken, bloodTypeRoutes)
app.use('/donates', authenticateToken, donateRoutes)
app.use('/chat', authenticateToken, chatRoutes)

export { app }
