import { Request, Response } from 'express'
import { Create, Delete, Select } from '../models/chat'
import { ZodError } from 'zod'
import { ChatSchema } from '../schema/chat'

export const createMessage = async (req: Request, res: Response) => {
	try {
		const data = ChatSchema.parse(req.body)
		const user = await Create(data)
		res.status(201).json(user)
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0] })
		} else {
			res.status(500).json({ error: error })
		}
	}
}

export const getMessages = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const orders = await Select(id)
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const deleteMessage = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const orders = await Delete(id)
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
