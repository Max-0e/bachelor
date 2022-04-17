import { IProject } from '@/intefaces/project.interface';
import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
	state: () => ({
        projects: [] as IProject[],
		currentProject: {} as IProject,
		isLoaded: false as boolean
	}),

	getters: {},

	actions: {
		updateProject(updatedProject: IProject) {
			this.projects[this.projects.findIndex(project => project._id === updatedProject._id)] = updatedProject;
		},
	},
});
