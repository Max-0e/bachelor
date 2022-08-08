import { ProjectModel, ProjectDocument } from '../models/project.model';
import { NotFoundError } from '../error/not-found.error';
import { IProject, IProjectModel } from '../interfaces/project.interface';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import taskService from './task.service';
import initiativeService from './initiative.service';
import { EntityService } from './entity.service';

class ProjectService extends EntityService<IProjectModel, IProjectDto> {
	constructor () {
		super(ProjectModel)
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
	 * deletes the Project with the given Id
	 * @param id
	 * @returns
	 */
	public override async deleteEntityById(id: string): Promise<void> {
		const project = await this.getEntityById(id);
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
			return await this.getEntityById(project?.id);
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

	public override async mapToDto(entity: ProjectDocument): Promise<IProjectDto> {
		const model = await this.mapModel(entity);
		const dto = {
			id: model._id,
            // TODO this should be possible in another way
			...(model as any)._doc
		};
        delete dto._id;
        delete dto.__v;
		dto.tasks = taskService.mapArrayToDtoArray(dto.tasks)
        return dto as IProjectDto;
	}
}

export default new ProjectService();
