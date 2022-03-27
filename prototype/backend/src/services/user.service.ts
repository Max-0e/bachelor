import { UserModel, UserDocument } from '../models/user.model';
import { NotFoundError } from '../error/not-found.error';
import { AuthorizationError } from '../error/auth.error';

class UserService {
	public async findUserByUsernameOrEmail(usernameOrEmail: string) {
		const user: UserDocument | null = await UserModel.findOne({
			$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
		});
		if (!user) throw new NotFoundError('This User does not exists.');
		if (!user.activated) throw new NotFoundError('This User was not activated');

		return user;
	}

	public async getUserById(id: string) {
		const user: UserDocument | null = await UserModel.findOne({ _id: id });
		if (!user) throw new NotFoundError('This User does not exists.');
		if (!user.activated) throw new NotFoundError('This User was not activated');

		return user;
	}

	public async createUser(user: UserDocument) {
		return await user.save();
	}

	public async activate(activationToken: string) {
		const res = await UserModel.updateOne(
			{ activationToken: activationToken },
			{ $set: { activated: true } }
		);
		if (res.modifiedCount === 0)
			throw new NotFoundError('This user was already was already activated');
	}

	public async resetPassword(pwdResetToken: string, pwdHash: string) {
		const user: UserDocument | null = await UserModel.findOne({
			pwdResetToken: pwdResetToken,
		});
		if (!user) throw new NotFoundError('This User does not exists.');
		if (this.checkResetDuration(user.pwdResetTime!)) {
			const res = await UserModel.updateOne(
				{ pwdResetToken: pwdResetToken },
				{ $set: { pwdHash: pwdHash } }
			);
			if (res.modifiedCount === 0)
				throw new NotFoundError('This User does not exists or the Token has already been used.');
		} else {
			throw new AuthorizationError('This ResetToken has reached its expiration');
		}
	}

	public async requestPasswordReset(email: string, token: string) {
		const res = await UserModel.updateOne(
			{ email: email },
			{ $set: { pwdResetToken: token, pwdResetTime: new Date() } }
		);

		if (res.modifiedCount === 0) throw new NotFoundError('This User does not exist.');
	}

	private checkResetDuration(pwdResetTime: Date) {
		const now = new Date();
		return ((now.getTime() - pwdResetTime.getTime()) / 36e5) < 3;
	}
}

export default new UserService();
