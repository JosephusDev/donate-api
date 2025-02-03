import { z } from 'zod'

export const UserSchema = z.object({
	email: z.string().email('O e-mail deve ser válido'),
	username: z.string().min(3, 'O Nome de usuário deve ter no mínimo 3 caracteres').toLowerCase(),
	password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
	fullname: z.string().min(3, 'O Nome deve ter no mínimo 3 caracteres'),
	gender: z.enum(['masculino', 'femenino', 'outro']),
	state: z.boolean(),
	user_type: z.enum(['individual', 'hospital']),
	address: z.string().nullable(),
	phone: z.string().length(9, 'O número de telefone deve ter 9 dígitos').nullable(),
	description: z.string().nullable(),
	blood_type_id: z.number().nullable(),
})
