import { Request, Response } from 'express'
import { Select } from '../models/blood_type.ts'

export const getBloodType = async (req: Request, res: Response) => {
	try {
		const response = await Select()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
