import { Request, Response } from 'express'
import { getDonate } from '../models/User.ts'

export const getDonates = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		if (id) {
			const response = await getDonate(id)
			res.status(200).json(response)
		} else {
			res.status(404).json({ error: 'Este usuário não existe.' })
		}
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
