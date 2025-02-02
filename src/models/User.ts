import prisma from '../config/prisma'
import { User } from '@prisma/client'

export const createUser = async (data: Omit<User, 'id'>) => {
	return await prisma.user.create({ data })
}

export const Login = async (data: Pick<User, 'username'>) => {
	return await prisma.user.findMany({ where: data })
}
