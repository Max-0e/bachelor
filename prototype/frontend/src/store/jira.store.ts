import { JiraProject } from '@/interfaces/jira-project.interface';
import jiraService from '@/services/jira.service';
import { defineStore } from 'pinia';

interface IJiraState {
	projects: JiraProject[];
}

export const useJiraStore = defineStore('jira', {
	state: (): IJiraState => ({
		projects: [],
	}),
	getters: {},
	actions: {
		async loadProjects() {
			this.projects = await jiraService.loadProjects();
		},
	},
});
