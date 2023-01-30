import { ITask, statusEnum } from '../interfaces/task.interface';
import { makeLinkableEntityModel } from './linkable-entity.model';

export const TaskModel = makeLinkableEntityModel<ITask>('Task', {
	status: { type: String, required: true, enum: statusEnum },
	storyPoints: { type: Number, required: true },
});
