import { compareSync } from 'bcrypt';
import passportLocal, { IVerifyOptions } from 'passport-local';

import UserService from '../services/user.service';

import { IUser } from '../interfaces/user.interface';

const LocalStrategy = passportLocal.Strategy;

export const localStrategy = new LocalStrategy(async function (
	username: string,
	password: string,
	done: (
		error: any,
		user?: Express.User | false,
		options?: IVerifyOptions
	) => void
) {
	try {
		// since passport needs the attribute to be named username a conversion to clear up
		const usernameOrEmail = username;
		const user: IUser = await UserService.findUserByUsernameOrEmail(
			usernameOrEmail
		);
		if (!compareSync(password, user.pwdHash)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	} catch (NotFoundError) {
		return done(null, false, { message: 'Incorrect Username or E-Mail.' });
	}
});
