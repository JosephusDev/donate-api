import { Order } from '@prisma/client'
import { getAvalebleDonate, getUser } from '../models/User'
import nodemailer from 'nodemailer'

// Configurar o serviço de e-mail (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false, // Desativa a verificação do certificado autoassinado
	},
})

export const sendMail = async (order: Omit<Order, 'id'>) => {
	const user = await getUser(order.user_id)
	const donates = await getAvalebleDonate(order.user_id, order.blood_type_id)

	donates?.map(async donate => {
		const mailOptions = {
			from: `Doe <${process.env.EMAIL_USER}>`,
			to: donate.email,
			subject: 'Pedido de Doação de Sangue',
			html: `
					<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; color: #333;">
					
					<h2 style="color: #F94144; margin-bottom: 16px;">Plataforma Doe!</h2>

					<p style="font-size: 16px; margin-bottom: 12px;">Saudações Sr(a). <strong>${donate.fullname}</strong></p>
					
					<p style="font-size: 15px; margin-bottom: 10px;">${order.description}</p>
					
					<p style="font-size: 15px; margin-bottom: 10px;"><strong>Local:</strong> ${order.donate_location}</p>
					
					<p style="font-size: 15px; margin-bottom: 20px;"><strong>Contacto:</strong> ${user.phone}</p>

					<p style="color: #777; font-size: 13px;">Atenciosamente,<br><strong>${user.fullname}</strong></p>
					</div>
				`,
		}
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
			}
		})
	})
}
