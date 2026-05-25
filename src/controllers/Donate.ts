import { Request, Response } from 'express'
import { getDonate, getHospitals } from '../models/User'

export const getDonates = async (req: Request, res: Response) => {
	try {
		const response = await getDonate()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

export const getHospitalsList = async (_req: Request, res: Response) => {
	try {
		const response = await getHospitals()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
