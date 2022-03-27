import { IUser } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export function makeDeserializeUser() {
	return async (id: any, done: any) => {
		try {
			const user: IUser = await UserService.getUserById(id);
			done(undefined, user);
		} catch (e) {
			done(e, undefined);
		}
	};
}
