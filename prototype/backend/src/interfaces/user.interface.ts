export interface IUser {
	username: string;
	email: string;
	pwdHash: string;
	pwdResetToken?: string;
	pwdResetTime?: Date;
	activated: boolean;
	activationToken?: string;
}
