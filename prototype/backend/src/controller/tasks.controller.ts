import { ITask } from '../interfaces/task.interface';
import { taskService } from '../services/tasks.service';
import { LinkableEntityController } from './linkable-entity.controller';

class TasksController extends LinkableEntityController<ITask> {
	constructor() {
		super(taskService);
	}
}

export const tasksController = new TasksController();
