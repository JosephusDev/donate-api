import prisma from '../config/prisma.ts'

export const Select = async () => {
	return await prisma.bloodType.findMany({
		orderBy: {
			name: 'asc',
		},
	})
}
