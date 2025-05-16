import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, Login, updateUser } from '../models/user.ts'
import { UserSchema } from '../schema/user'
import { ZodError } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import jwt from 'jsonwebtoken'

export const create = async (req: Request, res: Response) => {
	try {
		const data = UserSchema.parse(req.body)
		const passwordHash = bcrypt.hashSync(data.password, 10)
		data.password = passwordHash
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

export const update = async (req: Request, res: Response) => {
	try {
		const data = UserSchema.parse(req.body)
		if (data.password) {
			const passwordHash = bcrypt.hashSync(data.password, 10)
			data.password = passwordHash
		}
		console.log(req.params.id)
		const user = await updateUser(data, Number(req.params.id))
		res.status(200).json(user)
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
			const users = await Login({ username })
			if (users.length == 0) {
				res.status(404).json({ error: 'Usuário não encontrado' })
			} else {
				users.forEach(user => {
					const passwordHashed = bcrypt.compareSync(password, user.password)
					if (passwordHashed) {
						if (!process.env.JWT_SECRET) {
							res.status(400).json({ message: 'JWT Secret key is missing.' })
							return
						}
						const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
							expiresIn: '24h',
						})
						res.status(200).json({ user, token })
					} else {
						res.status(404).json({ error: 'Palavra-passe incorrecta' })
					}
				})
			}
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
