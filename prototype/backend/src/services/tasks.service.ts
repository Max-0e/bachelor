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
		if (!entity.status) errors.push('hirarchyLevel');
		if (entity.storyPoints === undefined) errors.push('hirarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
	validateEntityUpdateDto(entity: EntityCreateDto<ITask>): void {
		const errors: string[] = [];
		if (!entity.status) errors.push('hirarchyLevel');
		if (entity.storyPoints === undefined) errors.push('hirarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
}

export const taskService = new TasksService();
