import { useJiraStore } from '@/store/jira.store';

export async function jiraProjectResolver() {
	if (!useJiraStore().isLoaded) {
		const jiraStore = useJiraStore();
		await jiraStore.loadProjects();
	}
}
