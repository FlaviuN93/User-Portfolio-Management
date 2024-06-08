import nodemailer from 'nodemailer'
import { User } from '../models/types'
import pug from 'pug'
import { convert } from 'html-to-text'

class Email {
	private to: string
	private fullName: string
	private url: string | undefined
	private from: string

	constructor(user: { email: string; fullName: string }, url: string) {
		this.to = user.email
		this.fullName = user.fullName
		this.url = url
		this.from = `Flaviu Nemes <${process.env.EMAIL_FROM}>`
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// Sendgrid
			return 1
		}
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),

			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		})
	}

	// Still some small fixes for email.
	async send(template: string, subject: string) {
		const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, { subject })
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: convert(html),
		}

		const transporter = this.newTransport()
		if (typeof transporter !== 'number') {
			await transporter.sendMail(mailOptions)
		}
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to Devport!')
	}
	async sendResetPassword() {
		await this.send('resetPassword', 'Your password reset token (valid for only 10 min)')
	}
}

export default Email
