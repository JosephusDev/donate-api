import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
	// Your authentication logic here
	const token = req.header('Authorization')?.split(' ')[1]

	if (!token) {
		res.status(401).json({ message: 'Acesso negado' })
		return
	}

	if (!process.env.JWT_SECRET) {
		res.status(400).json({ message: 'JWT Secret key is missing' })
		return
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) return res.status(403).json({ message: 'Token inválido' })
			next()
		})
	} catch (error) {
		res.status(400).json({ message: 'Invalid token.' })
	}
}
