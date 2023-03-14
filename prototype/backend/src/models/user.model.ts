import { Document, model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	email: { type: String, required: true },
	pwdHash: { type: String, required: true },
	jiraApiToken: { type: String, required: false },
	jiraApiDomain: { type: String, required: false },
	jiraApiMail: { type: String, required: false },
	pwdResetToken: { type: String, required: false },
	pwdResetTime: { type: Date, required: false },
	activated: { type: Boolean, required: true },
	activationToken: { type: String },
});

userSchema.set('collection', 'users');

export const UserModel = model<IUser>('User', userSchema);

export type UserDocument = IUser & Document;
