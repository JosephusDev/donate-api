import { Request, Response } from 'express'
import { createUser, Login } from '../models/User'
import { UserSchema } from '../schema/user'
import { ZodError } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const create = async (req: Request, res: Response) => {
	try {
		const data = UserSchema.parse(req.body)
		const user = await createUser(data)
		res.status(201).json(user)
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0] })
		} else {
			res.status(500).json({ error: error })
		}
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = UserSchema.partial().parse(req.body)
		if (username && password) {
			const user = await Login({ username, password })
			res.status(200).json(user)
		} else {
			res.status(400).json({ error: 'Usuário e Senha são Obrigatórios' })
		}
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ error: error.errors[0] })
		} else if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
			res.status(404).json({ error: 'Usuário não encontrado' })
		} else {
			res.status(500).json({ error: error })
		}
	}
}
