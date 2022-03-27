import { defineStore } from 'pinia';
import { IToastConfig } from '@/intefaces/toastConfig';

export const useAppStore = defineStore('app', {
	state: () => ({
		showToastOnRouting: null as IToastConfig | null,
	}),

	getters: {},

	actions: {},
});
