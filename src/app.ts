import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use('/', (req: Request, res: Response) => {
	console.log(`${req.method} ${req.url}`)
	res.status(200).json({ message: 'Hello World' })
})

app.use(express.json())
app.use(cors())

export { app }
