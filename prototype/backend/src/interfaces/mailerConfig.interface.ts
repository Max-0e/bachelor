export interface IMailerConfig {
	recipientEmail: string;
	subject: string;
	text: string;
	html?: string;
}
