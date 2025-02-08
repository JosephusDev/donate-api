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

export const userOrders = async (id: number) => {
	return await prisma.order.findMany({
		select: {
			id: true,
			donate_location: true,
			description: true,
			urgency: true,
			state: true,
			blood_type: {
				select: {
					name: true,
				},
			},
		},
		where: {
			user_id: id,
		},
	})
}

export const orderNotifications = async (id: number) => {
	return await prisma.order.findMany({
		select: {
			id: true,
			donate_location: true,
			description: true,
			urgency: true,
			state: true,
			user: {
				select: {
					fullname: true,
					gender: true,
					phone: true,
					blood_type: {
						select: {
							name: true,
						},
					},
				},
			},
		},
		where: {
			state: 'pendente',
			user_id: {
				not: id, // Garante que o usuário não veja suas próprias ordens como notificações
			},
			blood_type_id: {
				in: await prisma.user
					.findMany({
						select: {
							blood_type_id: true,
						},
						where: {
							id: id,
						},
					})
					.then(users => users.map(value => value.blood_type_id).filter((id): id is number => id !== null)),
			},
		},
		orderBy: {
			urgency: 'asc',
		},
	})
}
