import prisma from '../config/prisma'
import { User } from '@prisma/client'

export const createUser = async (data: Omit<User, 'id'>) => {
	return await prisma.user.create({ data })
}

export const Login = async (data: Pick<User, 'username'>) => {
	return await prisma.user.findMany({ where: data })
}

export const getDonate = async () => {
	return await prisma.user.findMany({
		select: {
			fullname: true,
			gender: true,
			blood_type: {
				select: {
					name: true,
				},
			},
		},
		where: {
			user_type: 'individual',
			state: true,
			blood_type: {
				isNot: null,
			},
		},
	})
}

export const orderNotifications = async () => {
	return await prisma.order.findMany({
		select: {
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
				not: 1,
			},
		},
		orderBy: {
			urgency: 'desc', // Ordenando da maior para a menor urgência
		},
	})
}
