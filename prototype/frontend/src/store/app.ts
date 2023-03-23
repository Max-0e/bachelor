import { IToastConfig } from '@/interfaces/toastConfig';
import storageService from '@/services/storage.service';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		showToastOnRouting: null as IToastConfig | null,
		darkMode: true as boolean,
		relativeProgress: false as boolean,
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
		setRelativeProgressFromLocalStorage() {
			this.relativeProgress = storageService.getRelativeProgress();
		},
		setRelativeProgress() {
			this.relativeProgress = !this.relativeProgress;
			storageService.setRelativeProgress(this.relativeProgress);
		},
	},
});
