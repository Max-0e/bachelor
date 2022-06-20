import { ProjectModel, ProjectDocument } from '../models/project.model';
import { NotFoundError } from '../error/not-found.error';
import { IProject, IProjectModel } from '../interfaces/project.interface';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import taskService from './task.service';
import initiativeService from './initiative.service';

class ProjectService {
	/**
	 * gets all Projects
	 * @returns all Project from Database
	 */
	public async getProjects() {
		const projects: ProjectDocument[] = await ProjectModel.find();
		return projects;
	}

	/**
	 * gets Project by given Id
	 * @param projectId
	 * @returns the Projectdocument
	 */
	public async getProjectById(projectId: string) {
		const project: ProjectDocument | null = await ProjectModel.findOne({ _id: projectId });
		if (!project) throw new NotFoundError('This Project does not exists.');

		return project;
	}

	/**
	 * gets Project by given Task Id
	 * @param taskId
	 * @returns the Projectdocument
	 */
	public async getProjectByTaskId(taskId: string) {
		const project: ProjectDocument | null = await ProjectModel.findOne({ tasks: taskId });
		if (!project) throw new NotFoundError('This Project does not exists.');

		return project;
	}

	/**
	 * Create a ProjectDocument
	 * @param project
	 * @returns the created ProjectDocument
	 */
	public async createProject(project: IProject) {
		project.wipLimit = 5;
		const projectModel = new ProjectModel({ ...project });
		await projectModel.save();
		return await this.getProjectById(projectModel._id);
	}

	/**
	 * Update Project by id
	 * @param projectId
	 * @param project
	 * @returns the updated Project
	 */
	public async updateProject(projectId: string, project: IProject) {
		const projectToUpdate = await this.getProjectById(projectId);
		await projectToUpdate.updateOne(project);
		return await this.getProjectById(projectId);
	}

	/**
	 * deletes the Project with the given Id
	 * @param id
	 * @returns
	 */
	public async deleteProjectById(id: string) {
		const project = await this.getProjectById(id);
		project.tasks.forEach(async (taskId) => await taskService.deleteTaskById(taskId));
		try {
			const initiativesToRemoveProjectFrom =
				await initiativeService.getInitiativesContainingProject(id);
			for (const initiative of initiativesToRemoveProjectFrom) {
				await initiativeService.removeProjectFromInitiative(initiative._id, id);
			}
		} catch (error: any) {
			if (error.status !== 404) throw error;
		}
		return project.delete();
	}
	/**
	 * removes Task from Project
	 * @param taskId
	 * @returns the updated Project
	 */
	public async removeTaskFromProject(taskId: string) {
		const project = await this.getProjectByTaskId(taskId);
		if (!!project) {
			// TODO is there another way?
			project.tasks = project.tasks.filter(
				(taskIdFromDocument) => !taskIdFromDocument.toString().includes(taskId)
			);
			await project.save();
			return await this.getProjectById(project?.id);
		}
	}

	/**
	 * Map a ProjectModelObject to IProjectObject with populated Tasks
	 * @param projectModel
	 * @returns the IProjectObject
	 */
	public async mapModel(projectModel: ProjectDocument): Promise<IProject> {
		return await projectModel.populate('tasks');
	}

	/**
	 * Map an Array of ProjectModelObjects to Array of IProjectOIbjects with populated Tasks
	 * @param projectModels
	 * @returns the IProjectObject-Array
	 */
	public async mapModelArray(projectModels: ProjectDocument[]) {
		return await Promise.all(projectModels.map((projectModel) => this.mapModel(projectModel)));
	}

	/**
	 * map IProject to ProjectDto
	 * @param project
	 * @returns the ProjectDto
	 */
	public mapToProjectDto(project: IProject): IProjectDto {
		return {
			id: project._id,
			name: project.name,
			wipLimit: project.wipLimit,
			tasks: taskService.mapArrayToDtoArray(project.tasks),
		};
	}

	/**
	 * map IProject-Array to ProjectDto-Array
	 * @param projects
	 * @returns the ProjectDto-Array
	 */
	public mapArrayToProjectDtoArray(projects: IProject[]): IProjectDto[] {
		return projects.map((project) => this.mapToProjectDto(project));
	}
}

export default new ProjectService();
