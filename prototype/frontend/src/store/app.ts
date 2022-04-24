import { defineStore } from 'pinia';
import { IToastConfig } from '@/intefaces/toastConfig';
import storageService from '@/services/storage.service';

export const useAppStore = defineStore('app', {
	state: () => ({
		showToastOnRouting: null as IToastConfig | null,
		darkMode: false as boolean,
	}),

	getters: {},

	actions: {
		setDarkModeFromLocalStorage(){
			this.darkMode = storageService.getDarkMode();
		},
		setDarkMode() {
			this.darkMode = !this.darkMode;
			storageService.setDarkMode(this.darkMode);
		}
	},
});
