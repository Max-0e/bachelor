import sendResponse from "../utility/sendResponse";
import { NextFunction, Request, Response } from 'express';
import projectService from "../services/project.service";

class ProjectsController {
	public async getProjects(req: Request, res: Response): Promise<Response> {
        const projectModels = await projectService.getProjects();
		const projects = await projectService.mapModelArray(projectModels);
		return await sendResponse.data(res, 200, projectService.mapArrayToProjectDtoArray(projects));
	}

	public async getProjectById(req: Request, res: Response): Promise<Response> {
        const projectModel = await projectService.getProjectById(req.params.projectId);
		const project = await projectService.mapModel(projectModel);
		return await sendResponse.data(res, 200, projectService.mapToProjectDto(project));
	}

	public async createProject(req: Request, res: Response): Promise<Response> {
		const projectModel = await projectService.createProject(req.body);
		const project = await projectService.mapModel(projectModel);
		return await sendResponse.data(res, 201, projectService.mapToProjectDto(project));
	}
	public async updateProject(req: Request, res: Response): Promise<Response> {
		const projectModel = await projectService.updateProject(req.params.projectId, req.body);
		const project = await projectService.mapModel(projectModel);
		return await sendResponse.data(res, 203, projectService.mapToProjectDto(project));
	}

	public async deleteProject(req: Request, res: Response): Promise<Response> {
		await projectService.deleteProjectById(req.params.projectId);
		return await sendResponse.message(res, 204, "success");
	}
}

export default new ProjectsController(); 