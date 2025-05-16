import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import donateRoutes from './routes/donate.ts'
import chatRoutes from './routes/chat.ts'
import { authenticateToken } from './middleware/Authentication.ts'
import userRoutes from './routes/User.ts'
import orderRoutes from './routes/Order.ts'
import bloodTypeRoutes from './routes/blood_type.ts'

const app = express()

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error('Unhandled Error:', err)
	res.status(500).json({ error: 'Internal Server Error' })
})

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
