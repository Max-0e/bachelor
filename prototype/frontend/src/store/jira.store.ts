import { JiraProject } from '@/interfaces/jira/jira-project.interface';
import jiraService from '@/services/jira.service';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useAuthStore } from './auth';

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
			const user = useAuthStore().user;
			if (!user?.jiraApiDomain || !user?.jiraApiMail || !user?.jiraApiToken)
				return;
			try {
				this.projects = await jiraService.loadProjects();
				this.isLoaded = true;
			} catch (e: any) {
				useToast().error('Jira connection error import not available.');
			}
		},
		async loadProjectDetails(project: JiraProject) {
			return await jiraService.loadProjectDetails(project);
		},
		async loadProjectIssueStatuses(project: JiraProject) {
			return await jiraService.loadProjectIssueStatuses(project);
		},
		async loadIssueCustomFields() {
			return await jiraService.loadIssueCustomFields();
		},
		async loadProjectIssues(project: JiraProject) {
			return await jiraService.loadProjectIssues(project);
		},
	},
});
