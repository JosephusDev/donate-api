import { Order } from '@prisma/client'
import { getAvalebleDonate, getUser } from '../models/user'
import { EmailSchema } from '../schema/emailSchema'

export const sendMail = async (order: Omit<Order, 'id'>) => {
	const user = await getUser(order.user_id)
	const donates = await getAvalebleDonate(order.user_id, order.blood_type_id)

	donates?.map(async donate => {
		const donateParams = EmailSchema.parse({
			fullname: user.fullname,
			donate: donate.fullname,
			description: order.description,
			donate_mail: donate.email,
			owner_mail: user.email,
			donate_location: order.donate_location,
		})

		if (!process.env.EMAIL_URL) {
			console.error('EMAIL_URL nao foi reconhecido')
			return
		}
		const response = await fetch(process.env.EMAIL_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				service_id: process.env.SERVICE_ID,
				template_id: process.env.TEMPLATE_ID,
				user_id: process.env.USER_ID,
				accessToken: process.env.ACCESS_TOKEN,
				template_params: donateParams,
			}),
		})

		if (response.ok) {
			console.log('Email enviado com sucesso!')
		} else {
			console.error('Falha ao enviar Email: ', await response.text())
		}
	})
}
