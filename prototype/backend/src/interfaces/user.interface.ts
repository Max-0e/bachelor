export interface IUser {
	username: string;
	email: string;
	pwdHash: string;
	jiraApiToken?: string;
	pwdResetToken?: string;
	pwdResetTime?: Date;
	activated: boolean;
	activationToken?: string;
}
