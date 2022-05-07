import HttpClient from '../utility/http';
import { API_URL } from '../config';
import { ICreateTask, ITask } from '@/intefaces/task.interface';

class ProjectService {
	constructor() {}

	public async getTaskByProjectId(projectId: string): Promise<ITask[]> {
		const res = await HttpClient.get(`${API_URL}/tasks/project/${projectId}`, { withCredentials: true });
		return res.body as ITask[];
	}
	public async getTaskById(taskId: string): Promise<ITask> {
		const res = await HttpClient.get(`${API_URL}/tasks/${taskId}`, { withCredentials: true });
		return res.body as ITask;
	}

	public async createTask(projectId: string, task: ICreateTask): Promise<ITask> {
		const res = await HttpClient.post(`${API_URL}/tasks/${projectId}`, task, { withCredentials: true });
		return res.body as ITask;
	}

	public async updateTask(task: ICreateTask) {
		const res = await HttpClient.put(`${API_URL}/tasks`, task, { withCredentials: true });
		return res.body as ITask;
	}

	public async deleteTask(task: ITask) {
		return await HttpClient.delete(`${API_URL}/tasks/${task.id}`, { withCredentials: true });
	}
}

export default new ProjectService();
