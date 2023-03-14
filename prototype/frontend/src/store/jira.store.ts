import { JiraProject } from '@/interfaces/jira-project.interface';
import { JiraApiService } from '@/services/jira-api.service';
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

interface IJiraState {
	projects: JiraProject[];
}

export const useJiraStore = defineStore('jira', {
	state: (): IJiraState => ({
		projects: [],
	}),
	getters: {
		jiraService() {
			const user = useAuthStore()?.user;
			if (
				!user ||
				!user?.jiraApiDomain ||
				!user?.jiraApiToken ||
				!user?.jiraApiMail
			)
				return;
			return new JiraApiService(
				user.jiraApiToken,
				user.jiraApiDomain,
				user.jiraApiMail
			);
		},
	},
	actions: {
		async loadProjects() {
			const service = this.jiraService;
			if (!service) return;
			this.projects = await service.getProjects();
		},
	},
});
