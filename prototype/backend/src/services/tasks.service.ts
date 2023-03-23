import { ValidationError } from '../error/validation.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { ITask } from '../interfaces/task.interface';
import { TaskModel } from '../models/task-model';
import { LinkableEntityService } from './linkable-entity.service';

class TasksService extends LinkableEntityService<ITask> {
	constructor() {
		super(TaskModel);
	}

	validateEntityCreateDto(entity: EntityCreateDto<ITask>): void {
		const errors: string[] = [];
		if (!entity.status) errors.push('hierarchyLevel');
		if (entity.storyPoints === undefined) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	validateEntityUpdateDto(entity: EntityCreateDto<ITask>): void {
		const errors: string[] = [];
		if (!entity.status) errors.push('hierarchyLevel');
		if (entity.storyPoints === undefined) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	public async deleteAllTasksForProject(projectId: string) {
		const tasks = await this.getEntities();
		const tasksInProject = tasks.filter((task) =>
			task.entityGroupIds.includes(projectId)
		);
		await Promise.all(
			tasksInProject.map(async (task) => {
				return await this.deleteEntityById(task.id);
			})
		);
	}
}

export const taskService = new TasksService();
