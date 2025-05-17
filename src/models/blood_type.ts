import prisma from '../config/prisma'

export const Select = async () => {
	return await prisma.bloodType.findMany({
		orderBy: {
			name: 'asc',
		},
	})
}
