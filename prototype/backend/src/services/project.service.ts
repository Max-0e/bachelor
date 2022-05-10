import { ProjectModel, ProjectDocument } from '../models/project.model';
import { NotFoundError } from '../error/not-found.error';
import { IProject } from '../interfaces/project.interface';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import taskService from './task.service';
import initiativeService from './initiative.service';

class ProjectService {
	public async getProjects() {
		const projects: ProjectDocument[] = await ProjectModel.find();
		return projects;
	}
	public async getProjectById(projectId: string) {
		const project: ProjectDocument | null = await ProjectModel.findOne({ _id: projectId });
		if (!project) throw new NotFoundError('This Project does not exists.');

		return project;
	}

	public async createProject(project: IProject) {
		const projectModel = new ProjectModel({ ...project });
		return await projectModel.save();
	}

	public async updateProject(projectId: string, project: IProject) {
		const projectToUpdate = await this.getProjectById(projectId);
		await projectToUpdate.updateOne(project);
		return await this.getProjectById(projectId);
	}

	public async deleteProjectById(id: string) {
		const project = await this.getProjectById(id);
		project.tasks.forEach(async taskId => await taskService.deleteTaskById(taskId));
		try {
			const initiativesToRemoveProjectFrom = await initiativeService.getInitiativesContainingProject(id);
			for (const initiative of initiativesToRemoveProjectFrom ) {
				await initiativeService.removeProjectFromInitiative(initiative._id, id);
			}
		} catch (error: any) {
			if (error.status !== 404) throw error;
		}
		return project.delete();
	}

	public async removeTaskFromProject(taskId: string) {
		const project = await ProjectModel.findOne({ tasks: taskId });
		if(!!project) {
			// TODO is there another way?
			project.tasks = project.tasks.filter(
				(taskIdFromDocument) => !taskIdFromDocument.toString().includes(taskId)
			);
			await project.save();
			return await this.getProjectById(project?.id);
		}
	}

	public async mapModel(projectModel: ProjectDocument): Promise<IProject> {
		return await projectModel.populate('tasks');
	}

	public async mapModelArray(projectModels: ProjectDocument[]) {
		return await Promise.all(projectModels.map((projectModel) => this.mapModel(projectModel)));
	}

	public mapToProjectDto(project: IProject): IProjectDto {
		return {
			id: project._id,
			name: project.name,
			tasks: taskService.mapArrayToDtoArray(project.tasks),
		};
	}

	public mapArrayToProjectDtoArray(projects: IProject[]): IProjectDto[] {
		return projects.map((project) => this.mapToProjectDto(project));
	}
}

export default new ProjectService();
