import express from 'express'
import cors from 'cors'
import donateRoutes from './routes/donate.ts'
import chatRoutes from './routes/chat.ts'
import { authenticateToken } from './middleware/Authentication.ts'
import userRoutes from './routes/user.ts'
import orderRoutes from './routes/order.ts'
import bloodTypeRoutes from './routes/bloodtype.ts'

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
