import prisma from '../config/prisma'

export const get = async () => {
	return await prisma.bloodType.findMany({
		orderBy: {
			name: 'asc',
		},
	})
}
