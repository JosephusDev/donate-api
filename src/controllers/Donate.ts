import { Request, Response } from 'express'
import { getDonate } from '../models/User'

export const getDonates = async (req: Request, res: Response) => {
	try {
		const response = await getDonate()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
