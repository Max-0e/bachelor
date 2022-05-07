import HttpClient from '../utility/http';
import { API_URL } from '../config';
import { ICreateProject, IProject } from '@/intefaces/project.interface';

class ProjectService {
	constructor() {}

	public async getProjects(): Promise<IProject[]> {
		const res = await HttpClient.get(`${API_URL}/projects`, { withCredentials: true });
		return res.body as IProject[];
	}

	public async createProject(project: ICreateProject): Promise<IProject> {
		const res = await HttpClient.post(`${API_URL}/projects`, project, { withCredentials: true });
		return res.body as IProject;
	}

	public async updateProject(projectId: string, project: ICreateProject) {
		const res = await HttpClient.put(`${API_URL}/projects/${projectId}`, project, { withCredentials: true });
		return res.body as IProject;
	}

	public async deleteProject(project: IProject) {
		return await HttpClient.delete(`${API_URL}/projects/${project.id}`, { withCredentials: true });
	}
}

export default new ProjectService();
