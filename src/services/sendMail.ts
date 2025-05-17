import { Order } from '@prisma/client'
import { getAvalebleDonate, getUser } from '../models/User'
import nodemailer from 'nodemailer'
import type { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer'

// Configuração tipada do transporter
const transporter: Transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

interface EmailDonate {
	email: string
	fullname: string
}

interface UserWithPhone {
	phone: string
	fullname: string
}

export const sendMail = async (order: Omit<Order, 'id'>): Promise<void> => {
	try {
		const user = (await getUser(order.user_id)) as UserWithPhone
		const donates = (await getAvalebleDonate(order.user_id, order.blood_type_id)) as EmailDonate[] | null

		if (!donates || donates.length === 0) {
			console.warn('No available donors found')
			return
		}

		const sendEmailPromises = donates.map(async (donate: EmailDonate) => {
			const mailOptions: SendMailOptions = {
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

			return new Promise<void>((resolve, reject) => {
				transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
					if (error) {
						console.error(`Error sending email to ${donate.email}:`, error)
						reject(error)
					} else {
						console.log(`Email sent to ${donate.email}:`, info.response)
						resolve()
					}
				})
			})
		})

		await Promise.all(sendEmailPromises)
	} catch (error) {
		console.error('Error in sendMail function:', error)
		throw new Error('Failed to send emails')
	}
}
