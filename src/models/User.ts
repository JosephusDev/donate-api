import prisma from '../config/prisma'
import { User } from '@prisma/client'

export const createUser = async (data: Omit<User, 'id'>) => {
	return await prisma.user.create({ data })
}

export const Login = async (data: Pick<User, 'username'>) => {
	return await prisma.user.findMany({ where: data })
}

export const getDonate = async (user_id: number) => {
	return await prisma.user.findMany({
		select: {
			id: true,
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
			id: {
				not: user_id,
			},
		},
	})
}

export const orderNotifications = async (user_id: number) => {
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
				not: user_id,
			},
		},
		orderBy: {
			urgency: 'desc', // Ordenando da maior para a menor urgência
		},
	})
}

//Obter os doadores disponiveis

export const getAvalebleDonate = async (id: number, blood_type_id: number) => {
	return await prisma.user.findMany({
		select: {
			fullname: true,
			email: true,
		},
		where: {
			id: {
				not: id,
			},
			user_type: 'individual',
			state: true,
			blood_type: {
				isNot: null,
			},
			blood_type_id: {
				equals: blood_type_id,
			},
		},
	})
}

//Obter um usuario especifico

export const getUser = async (id: number) => {
	return await prisma.user.findFirstOrThrow({
		where: {
			id: {
				equals: id,
			},
		},
	})
}
