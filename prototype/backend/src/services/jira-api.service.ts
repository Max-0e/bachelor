import { JIRA_API_URL } from '../config';
import { JiraGetProjectResponse } from '../interfaces/jira-project.interface';
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
