import sendResponse from "../utility/sendResponse";
import { NextFunction, Request, Response } from 'express';
import taskService from "../services/task.service";

class TasksController {
	public async getTasksByProjectId(req: Request, res: Response): Promise<Response> {
        const tasks = await taskService.getTasksByProjectId(req.params.projectId);
		return await sendResponse.data(res, 200, tasks);
	}

	public async getTaskById(req: Request, res: Response): Promise<Response> {
        const task = await taskService.getTaskById(req.params.taskId);
		return await sendResponse.data(res, 200, task);
	}

	public async createTask(req: Request, res: Response): Promise<Response> {
		const task = await taskService.createTask(req.params.projectId, req.body);
		return await sendResponse.data(res, 201, task);
	}
	public async updateTask(req: Request, res: Response): Promise<Response> {
		const task = await taskService.updateTask(req.params.taskId, req.body);
		return await sendResponse.data(res, 203, task);
	}

	public async deleteTask(req: Request, res: Response): Promise<Response> {
		await taskService.deleteTaskById(req.params.taskId);
		return await sendResponse.message(res, 204, "success");
	}
}

export default new TasksController(); 