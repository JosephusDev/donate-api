import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { OrderSchema } from '../schema/order'
import { createOrder, deleteOrder, getOrder, updateOrder, orderNotifications, userOrders } from '../models/Order'
import { sendMail } from '../services/sendMail'

export const create = async (req: Request, res: Response) => {
	try {
		const data = OrderSchema.parse(req.body)
		const order = await createOrder(data)
		if (order) sendMail(order)
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
		const orders = await getOrder()
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
		await updateOrder(id, data)
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
		await deleteOrder(id)
		res.status(206).json({ message: 'Eliminado com sucesso.' })
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const getOrderNotifications = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const orders = await orderNotifications(id) // Corrigindo a chamada da função
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
