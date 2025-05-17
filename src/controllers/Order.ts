import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { OrderSchema } from '../schema/order'
import { Create, Delete, Select, Update, orderNotifications, userOrders } from '../models/Order'
import { sendSMS } from '../services/sendSMS'

export const create = async (req: Request, res: Response) => {
	try {
		const data = OrderSchema.parse(req.body)
		const order = await Create(data)
		if (order) sendSMS(order)
		res.status(201).json(order)
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0] })
		} else {
			res.status(500).json({ error: error })
		}
	}
}

export const getOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Select()
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const getUserOrders = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const orders = await userOrders(id)
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const update = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const data = OrderSchema.partial().parse(req.body)
		await Update(id, data)
		res.status(206).json({ message: 'Atualizado com sucesso.' })
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0] })
		} else {
			res.status(500).json({ error: error })
		}
	}
}

export const deleteAnOrder = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		await Delete(id)
		res.status(206).json({ message: 'Eliminado com sucesso.' })
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const getOrderNotifications = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		if (id) {
			const orders = await orderNotifications(id) // Corrigindo a chamada da função
			res.status(200).json(orders)
		} else {
			res.status(404).json({ error: 'Este usuário não existe.' })
		}
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
