import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { get } from '../models/BloodType'

export const getBloodType = async (req: Request, res: Response) => {
	try {
		const response = await get()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
