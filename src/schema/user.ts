import { z } from 'zod'

export const UserSchema = z.object({
    email: z.string().email('O e-mail deve ser válido'),
    username: z.string().min(2, 'Nome de usuário obrigatório'),
    fullname: z.string().optional(),
    gender: z.enum(['masculino', 'femenino']).optional(),
    supporting_document: z.string().optional(),
    user_type: z.enum(['doador', 'receptor', 'hospital']),
    address: z.string(),
    phone: z.string(),
    description: z.string().optional(),
    blood_type_id: z.number()
})
