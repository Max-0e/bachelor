import HttpClient from '../utility/http';
import { API_URL } from '../config';
import { ICreateObjective, IObjective } from '@/intefaces/objective.interface';
import { IInitiative } from '@/intefaces/initiative.interface';

class ObjectiveService {
	constructor() {}

	public async getObjectives(): Promise<IObjective[]> {
		const res = await HttpClient.get(`${API_URL}/objectives/`, { withCredentials: true });
		return res.body as IObjective[];
	}

	public async getObjectiveById(objectiveId: string): Promise<IObjective> {
		const res = await HttpClient.get(`${API_URL}/objectives/${objectiveId}`, { withCredentials: true });
		return res.body as IObjective;
	}

	public async createObjective(objective: ICreateObjective): Promise<IObjective> {
		const res = await HttpClient.post(`${API_URL}/objectives`, objective, { withCredentials: true });
		return res.body as IObjective;
	}

	public async updateObjective(objectiveId: string, objective: ICreateObjective) {
		const res = await HttpClient.put(`${API_URL}/objectives/${objectiveId}`, objective, { withCredentials: true });
		return res.body as IObjective;
	}

	public async addInitiativeToObjective(objective: IObjective, initiative: IInitiative) {
		const res = await HttpClient.post(
			`${API_URL}/objectives/${objective.id}/addInitiative/${initiative.id}`,
			{},
			{ withCredentials: true }
		);
		return res.body as IObjective;
	}

	public async removeInitiativeFromObjective(objective: IObjective, initiative: IInitiative) {
		const res = await HttpClient.delete(`${API_URL}/objectives/${objective.id}/removeInitiative/${initiative.id}`, {
			withCredentials: true,
		});
		return res.body as IObjective;
	}

	public async deleteObjective(objective: IObjective) {
		return await HttpClient.delete(`${API_URL}/objectives/${objective.id}`, { withCredentials: true });
	}
}

export default new ObjectiveService();
