import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from './models/user.model';
import userService from './services/user.service';

export const createTestUser = async () => {
	console.log('creating test user 🧪');
	const existingUser = await userService.findUserByUsernameOrEmail('testuser');
	if (existingUser) {
		console.log('test user already exists 🦾');
		return;
	}
	const user = new UserModel({
		_id: new mongoose.Types.ObjectId(),
		username: 'testuser',
		email: 'test@user',
		pwdHash: bcrypt.hashSync('Test1234', 10),
		activated: true,
		activationToken: '',
	});

	await userService.createUser(user);
	console.log('successfully created test user 👌');
};
