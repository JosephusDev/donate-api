import { Order } from '@prisma/client'
import { getAvalebleDonate, getUser } from '../models/User'

export const sendSMS = async (order: Omit<Order, 'id'>) => {
	const user = await getUser(order.user_id)
	const donates = await getAvalebleDonate(order.user_id, order.blood_type_id)

	donates?.map(async donate => {
		fetch('https://api.useombala.ao/v1/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.USEOMBALA_API_KEY}`,
			},
			body: JSON.stringify({
				message: `Olá Sr(a). ${donate.fullname}, ${order.description}. Local: ${order.donate_location}. Contacto: ${user.phone}, Atenciosamente: ${user.fullname}`,
				from: process.env.USEOMBALA_OWNER,
				to: donate.phone,
			}),
		})
	})
}
