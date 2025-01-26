import express from 'express'
import cors from 'cors'
import userRoutes from './routes/User'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRoutes)

export { app }
