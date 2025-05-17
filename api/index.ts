import express from 'express'
import cors from 'cors'
import donateRoutes from './routes/donate.ts'
import chatRoutes from './routes/chat.ts'
import { authenticateToken } from './middleware/Authentication.ts'
import userRoutes from './routes/User.ts'
import orderRoutes from './routes/Order.ts'
import bloodTypeRoutes from './routes/blood_type.ts'

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

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
try {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`)
	})
} catch (error) {
	console.error('Erro ao iniciar o servidor:', error)
	process.exit(1)
}
