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
app.use('/donates', donateRoutes)
app.use('/order', orderRoutes)
app.use('/bloodtypes', bloodTypeRoutes)

// Rotas privadas
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
