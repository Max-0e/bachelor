import HttpClient from '../utility/http';
import { API_URL } from '../config';
import { ICreateInitiative, IInitiative } from '@/intefaces/initiative.interface';
import { IProject } from '@/intefaces/project.interface';

class InitiativeService {
	constructor() {}

	public async getInitiatives(): Promise<IInitiative[]> {
		const res = await HttpClient.get(`${API_URL}/initiatives/`, { withCredentials: true });
		return res.body as IInitiative[];
	}

	public async getInitiativeById(initiativeId: string): Promise<IInitiative> {
		const res = await HttpClient.get(`${API_URL}/initiatives/${initiativeId}`, { withCredentials: true });
		return res.body as IInitiative;
	}

	public async createInitiative(initiative: ICreateInitiative): Promise<IInitiative> {
		const res = await HttpClient.post(`${API_URL}/initiatives`, initiative, { withCredentials: true });
		return res.body as IInitiative;
	}

	public async updateInitiative(initiativeId: string, initiative: ICreateInitiative) {
		const res = await HttpClient.put(`${API_URL}/initiatives/${initiativeId}`, initiative, { withCredentials: true });
		return res.body as IInitiative;
	}

	public async addProjectToInitiative(initiative: IInitiative, project: IProject) {
		const res = await HttpClient.post(
			`${API_URL}/initiatives/${initiative.id}/addProject/${project.id}`,
			{},
			{ withCredentials: true }
		);
		return res.body as IInitiative;
	}

	public async removeProjectFromInitiative(initiative: IInitiative, project: IProject) {
		const res = await HttpClient.delete(`${API_URL}/initiatives/${initiative.id}/removeProject/${project.id}`, {
			withCredentials: true,
		});
		return res.body as IInitiative;
	}

	public async deleteInitiative(initiative: IInitiative) {
		return await HttpClient.delete(`${API_URL}/initiatives/${initiative.id}`, { withCredentials: true });
	}
}

export default new InitiativeService();
