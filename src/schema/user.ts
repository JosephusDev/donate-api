import { z } from 'zod'

export const UserSchema = z.object({
	email: z.string().email('O e-mail deve ser válido'),
	username: z
		.string({
			message: 'O nome de usuário é obrigatório',
		})
		.min(3, 'O Nome de usuário deve ter no mínimo 3 caracteres')
		.trim()
		.toLowerCase(),
	password: z
		.string({
			message: 'A senha de usuário é obrigatória',
		})
		.min(4, 'A senha deve ter pelo menos 4 caracteres')
		.trim(),
	fullname: z.string().min(3, 'O Nome deve ter no mínimo 3 caracteres').trim(),
	gender: z.enum(['masculino', 'femenino', 'outro']),
	state: z.boolean(),
	user_type: z.enum(['individual', 'hospital']),
	address: z.string().trim().nullable(),
	phone: z.string().length(9, 'O número de telefone deve ter 9 dígitos').trim().nullable(),
	description: z.string().trim().nullable(),
	blood_type_id: z.number().nullable(),
})
