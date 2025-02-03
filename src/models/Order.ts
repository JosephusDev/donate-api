import prisma from '../config/prisma'
import { Order } from '@prisma/client'

export const createOrder = async (data: Omit<Order, 'id'>) => {
	return await prisma.order.create({ data })
}

export const getOrder = async () => {
	return await prisma.order.findMany({
		orderBy: {
			urgency: 'asc',
		},
	})
}

export const updateOrder = async (id: number, data: Partial<Order>) => {
	return await prisma.order.update({
		data,
		where: {
			id,
		},
	})
}

export const deleteOrder = async (id: number) => {
	return await prisma.order.delete({
		where: {
			id,
		},
	})
}
