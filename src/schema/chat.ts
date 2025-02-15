import { z } from 'zod'

export const ChatSchema = z.object({
	user_id_from: z.number({
		message: 'O ID do usuário de origem é obrigatório.',
	}),
	user_id_to: z.number({
		message: 'O ID do usuário de destino é obrigatório.',
	}),
	message: z
		.string({
			message: 'A mensagem é obrigatória.',
		})
		.min(1),
})
