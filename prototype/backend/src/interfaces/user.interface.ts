export interface IUser {
	username: string;
	email: string;
	pwdHash: string;
	jiraApiToken?: string;
	jiraApiDomain?: string;
	jiraApiMail?: string;
	pwdResetToken?: string;
	pwdResetTime?: Date;
	activated: boolean;
	activationToken?: string;
}
