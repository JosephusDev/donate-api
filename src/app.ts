import express from 'express'
import cors from 'cors'
import userRoutes from './routes/User'
import orderRoutes from './routes/Order'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRoutes)
app.use('/order', orderRoutes)

export { app }
