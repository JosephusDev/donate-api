import { Request, Response } from 'express'
import { createUser } from '../models/User'
import { UserSchema } from '../schema/user'
import { ZodError } from 'zod'
import { User } from '@prisma/client'

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
