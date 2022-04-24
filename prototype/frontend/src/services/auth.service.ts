import HttpClient from '../utility/http';
import { API_URL } from '../config';
import { ILoginPayload } from '@/intefaces/loginPayload.interface';
import { IRegisterPayload } from '@/intefaces/registerPayload.interface';
import { IResetPasswordPayload } from '@/intefaces/resetPassword.interface';
import { User } from '@/intefaces/user.interface';

class AuthService {
	constructor() {}

	public async register(registerPayload: IRegisterPayload) {
		return await HttpClient.post(`${API_URL}/auth/register`, registerPayload, {});
	}

	public async authorize() {
		const res = await HttpClient.get(`${API_URL}/auth/authorize`, { withCredentials: true });
		return res.body as User;
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
		const res = await HttpClient.post(
			`${API_URL}/auth/login`,
			{
				// scince passport needs the attribute to be named username a convertion is needed here
				username: loginPayload.usernameOrEmail,
				password: loginPayload.password,
			},
			{ withCredentials: true }
		)
		return res.body as User;
	}

	public async logout() {
		return await HttpClient.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
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
		return await HttpClient.post(`${API_URL}/auth/reset-password/`, resetPasswordPayload, {});
	}
}

export default new AuthService();
