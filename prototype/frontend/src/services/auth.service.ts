import { ILoginPayload } from '@/intefaces/loginPayload.interface';
import { IRegisterPayload } from '@/intefaces/registerPayload.interface';
import { IResetPasswordPayload } from '@/intefaces/resetPassword.interface';
import { User } from '@/intefaces/user.interface';
import { API_URL } from '../config';
import HttpClient from '../utility/http';

class AuthService {
	constructor() {}

	public async register(registerPayload: IRegisterPayload) {
		return await HttpClient.post(
			`${API_URL}/auth/register`,
			registerPayload,
			{}
		);
	}

	public async authorize() {
		return await HttpClient.get<User>(`${API_URL}/auth/authorize`, {
			withCredentials: true,
		});
	}

	public async activate(activationToken: string) {
		return await HttpClient.post(
			`${API_URL}/auth/activate`,
			{
				activationToken,
			},
			{}
		);
	}

	public async login(loginPayload: ILoginPayload) {
		return await HttpClient.post<User>(
			`${API_URL}/auth/login`,
			{
				// scince passport needs the attribute to be named username a convertion is needed here
				username: loginPayload.usernameOrEmail,
				password: loginPayload.password,
			},
			{ withCredentials: true }
		);
	}

	public async logout() {
		return await HttpClient.post(
			`${API_URL}/auth/logout`,
			{},
			{ withCredentials: true }
		);
	}

	public async forgotPassword(email: string) {
		return await HttpClient.post(
			`${API_URL}/auth/forgot-password`,
			{
				email,
			},
			{}
		);
	}

	public async resetPassword(resetPasswordPayload: IResetPasswordPayload) {
		return await HttpClient.post(
			`${API_URL}/auth/reset-password/`,
			resetPasswordPayload,
			{}
		);
	}
}

export default new AuthService();
