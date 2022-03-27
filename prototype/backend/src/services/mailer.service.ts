import nodemailer from 'nodemailer';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../config';

import { IMailerConfig } from '../interfaces/mailerConfig.interface';

class MailerService {
	public sendMail(config: IMailerConfig) {
		const transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASS,
			},
		});
		const message = {
			from: '<noreply@frontend.de>',
			to: `<${config.recipientEmail}>`,
			subject: config.subject,
			text: config.text,
			html: config.html,
		};
		transporter.sendMail(message, (err, info) => {
			if (err) {
				throw {
					status: 500,
					code: 'MAIL_ERROR',
					message: 'E-Mail konnte nicht gesendet werden',
					error: err,
				};
			}
			return info;
		});
	}
}

export default new MailerService();
