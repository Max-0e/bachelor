import storageService from '@/services/storage.service';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		loggedIn: false as boolean,
	}),

	getters: {},

	actions: {
		setLoggedIn(loggedIn: boolean) {
			this.loggedIn = loggedIn;
			storageService.setHasCookie(loggedIn);
		},
	},
});
