import { API_URL } from '@/config';
import { JiraProject } from '@/interfaces/jira-project.interface';
import HttpClient from '../utility/http';

class JiraService {
	constructor() {}

	public async loadProjects() {
		return await HttpClient.get<JiraProject[]>(`${API_URL}/jira/projects`, {
			withCredentials: true,
		});
	}
}

export default new JiraService();
