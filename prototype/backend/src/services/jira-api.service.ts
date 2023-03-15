import { JIRA_API_URL } from '../config';
import { JiraIssueStatusResponse } from '../interfaces/jira-issue-status.interface';
import { JiraIssueRequest } from '../interfaces/jira-issue.interface';
import {
	JiraGetProjectResponse,
	JiraProjectDetails,
} from '../interfaces/jira-project.interface';
import HttpClient from '../utility/http';

export class JiraApiService {
	constructor(
		private token: string,
		private domain: string,
		private mail: string
	) {}

	public async getProjects() {
		const res = await HttpClient.get<JiraGetProjectResponse>(
			`https://${this.domain}${JIRA_API_URL}/project/search`,
			this.getAuthHeaders()
		);
		return res.values;
	}
	public async getProjectDetails(projectKey: string) {
		return await HttpClient.get<JiraProjectDetails>(
			`https://${this.domain}${JIRA_API_URL}/project/${projectKey}`,
			this.getAuthHeaders()
		);
	}

	public async getAllIssuesForProject(projectKey: string) {
		const firstRes = await this.getIssuesForProject(projectKey);
		const issues = [firstRes.issues];
		let startAt = 50;
		while (startAt < firstRes.total) {
			issues.push((await this.getIssuesForProject(projectKey, startAt)).issues);
			startAt += 50;
		}

		return issues.flat();
	}
	public async getIssueStatusesForProject(projectId: string) {
		const res = await HttpClient.get<JiraIssueStatusResponse>(
			`https://${this.domain}${JIRA_API_URL}/statuses/search?projectId=${projectId}`,
			this.getAuthHeaders()
		);
		return res.values;
	}

	public async getIssuesForProject(projectKey: string, startAt: number = 0) {
		return await HttpClient.get<JiraIssueRequest>(
			`https://${this.domain}${JIRA_API_URL}/search?jql=project%20%3D%20${projectKey}&startAt=${startAt}`,
			this.getAuthHeaders()
		);
	}
	private getAuthHeaders() {
		return {
			headers: {
				Authorization: `Basic ${Buffer.from(
					this.mail + ':' + this.token
				).toString('base64')}`,
			},
		};
	}
}
