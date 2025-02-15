import express from 'express'
import cors from 'cors'
import userRoutes from './routes/User'
import orderRoutes from './routes/Order'
import bloodTypeRoutes from './routes/bloodType'
import donateRoutes from './routes/donate'
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

export { app }
