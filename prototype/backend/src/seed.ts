import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from './models/user.model';
import userService from './services/user.service';
import Logger from './utility/log';

export const createTestUser = async () => {
	Logger.log('Creating test user', '🧪');
	try {
		const existingUser = await userService.findUserByUsernameOrEmail(
			'testuser'
		);
		Logger.log('Test user already exists', '🦾');
	} catch (error) {
		const user = new UserModel({
			_id: new mongoose.Types.ObjectId(),
			username: 'testuser',
			email: 'test@user',
			pwdHash: bcrypt.hashSync('Test1234', 10),
			activated: true,
			activationToken: '',
		});

		await userService.createUser(user);
		Logger.log('Successfully created test user', '👌');
	}
};
