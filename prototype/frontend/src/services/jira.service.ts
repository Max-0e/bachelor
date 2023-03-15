import { API_URL } from '@/config';
import { JiraIssueStatus } from '@/interfaces/jira-issue-status.interface';
import { JiraIssue } from '@/interfaces/jira-issue.interface';
import {
	JiraProject,
	JiraProjectDetails,
} from '@/interfaces/jira-project.interface';
import HttpClient from '../utility/http';

class JiraService {
	constructor() {}

	public async loadProjects() {
		return await HttpClient.get<JiraProject[]>(`${API_URL}/jira/projects`, {
			withCredentials: true,
		});
	}

	public async loadProjectDetails(project: JiraProject) {
		return await HttpClient.get<JiraProjectDetails>(
			`${API_URL}/jira/projects/${project.key}`,
			{
				withCredentials: true,
			}
		);
	}

	public async loadProjectIssueStatuses(project: JiraProject) {
		return await HttpClient.get<JiraIssueStatus[]>(
			`${API_URL}/jira/projects/${project.id}/statuses`,
			{
				withCredentials: true,
			}
		);
	}

	public async loadProjectIssues(project: JiraProject) {
		return await HttpClient.get<JiraIssue[]>(
			`${API_URL}/jira/projects/${project.key}/issues`,
			{
				withCredentials: true,
			}
		);
	}
}

export default new JiraService();
