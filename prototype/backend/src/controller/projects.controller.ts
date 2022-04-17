import sendResponse from "../utility/sendResponse";
import { NextFunction, Request, Response } from 'express';
import projectService from "../services/project.service";

class ProjectsController {
	public async getProjects(req: Request, res: Response): Promise<Response> {
        const projects = await projectService.getProjects();
		return await sendResponse.data(res, 200, projects);
	}

	public async getProjectById(req: Request, res: Response): Promise<Response> {
        const project = await projectService.getProjectById(req.params.projectId);
		return await sendResponse.data(res, 200, project);
	}

	public async createProject(req: Request, res: Response): Promise<Response> {
		const project = await projectService.createProject(req.body);
		return await sendResponse.data(res, 201, project);
	}
	public async updateProject(req: Request, res: Response): Promise<Response> {
		const project = await projectService.updateProject(req.params.projectId, req.body);
		return await sendResponse.data(res, 203, project);
	}

	public async deleteProject(req: Request, res: Response): Promise<Response> {
		await projectService.deleteProjectById(req.params.projectId);
		return await sendResponse.message(res, 204, "success");
	}
}

export default new ProjectsController(); 