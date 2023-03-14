import { ILoginPayload } from '@/interfaces/loginPayload.interface';
import { User } from '@/interfaces/user.interface';
import authService from '@/services/auth.service';
import storageService from '@/services/storage.service';
import { defineStore } from 'pinia';

interface IAuthState {
	user: User | null;
	loggedIn: boolean;
}

export const useAuthStore = defineStore('auth', {
	state: (): IAuthState => ({
		user: null,
		loggedIn: false,
	}),
	actions: {
		async checkAuthorization() {
			if (storageService.getHasCookie()) {
				return authService
					.authorize()
					.then((user) => {
						this.setLoggedIn(true);
						this.user = user;
					})
					.catch((_) => this.setLoggedIn(false));
			}
		},
		async login(loginPayload: ILoginPayload): Promise<void> {
			return authService.login(loginPayload).then((user) => {
				this.setLoggedIn(true);
				this.user = user;
			});
		},
		async logout() {
			await authService.logout().then((_) => this.setLoggedIn(false));
		},
		async addJiraApiToken(token: string, domain: string, mail: string) {
			await authService
				.addJiraApiToken(token, domain, mail)
				.then((user) => (this.user = user));
		},
		async deleteJiraApiToken() {
			await authService.deleteJiraApiToken().then((user) => (this.user = user));
		},
		setLoggedIn(loggedIn: boolean) {
			this.loggedIn = loggedIn;
			storageService.setHasCookie(loggedIn);
		},
	},
});
