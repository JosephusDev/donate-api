import { z } from 'zod'

export const EmailSchema = z.object({
	fullname: z.string(),
	donate: z.string(),
	description: z.string(),
	donate_mail: z.string().email(),
	owner_mail: z.string().email(),
	donate_location: z.string(),
})
