import { z } from 'zod'

export const BloodTypeSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
})