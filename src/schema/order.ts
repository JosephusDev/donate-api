import { z } from "zod"

export const OrderSchema = z.object({
    donate_location: z.string(),
    urgency: z.enum(['normal', 'media', 'alta']),
    description: z.string(),
    state: z.enum(['pendente', 'concluído', 'cancelado']),
    user_id: z.number(),
    blood_type_id: z.number()
})

