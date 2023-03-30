import { IToastConfig } from '@/interfaces/toastConfig';
import storageService from '@/services/storage.service';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		showToastOnRouting: null as IToastConfig | null,
		darkMode: true as boolean,
		progressType: 'absolute' as ProgressType,
	}),

	getters: {},

	actions: {
		setDarkModeFromLocalStorage() {
			this.darkMode = storageService.getDarkMode();
		},
		setDarkMode() {
			this.darkMode = !this.darkMode;
			storageService.setDarkMode(this.darkMode);
		},
		setProgressTypeFromLocalStorage() {
			this.progressType = storageService.getProgressType();
		},
		setProgressType(type: ProgressType) {
			this.progressType = type;
			storageService.setProgressType(this.progressType);
		},
	},
});

export type ProgressType = 'absolute' | 'storyPoints' | 'value';
