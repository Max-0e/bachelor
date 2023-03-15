import { JiraProject } from '@/interfaces/jira-project.interface';
import jiraService from '@/services/jira.service';
import { defineStore } from 'pinia';

interface IJiraState {
	projects: JiraProject[];
	isLoaded: boolean;
}

export const useJiraStore = defineStore('jira', {
	state: (): IJiraState => ({
		projects: [],
		isLoaded: false,
	}),
	getters: {},
	actions: {
		async loadProjects() {
			this.projects = await jiraService.loadProjects();
			this.isLoaded = true;
		},
		async loadProjectDetails(project: JiraProject) {
			return await jiraService.loadProjectDetails(project);
		},
		async loadProjectIssueStatuses(project: JiraProject) {
			return await jiraService.loadProjectIssueStatuses(project);
		},
		async loadProjectIssues(project: JiraProject) {
			return await jiraService.loadProjectIssues(project);
		},
	},
});
