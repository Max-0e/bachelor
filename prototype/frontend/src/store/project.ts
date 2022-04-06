import { IProject } from '@/intefaces/project.interface';
import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
	state: () => ({
        projects: [
            {
                name: "projectOne"
            },
            {
                name: "projectTwo"
            },
        ] as IProject[]
	}),

	getters: {},

	actions: {},
});
