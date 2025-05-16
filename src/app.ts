import express from 'express'
import cors from 'cors'
import userRoutes from './routes/User.ts'

const app = express()

app.use(express.json())
app.use(cors())
//Public routes
app.use('/user', userRoutes)

export { app }
