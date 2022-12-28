import { ITask } from '../interfaces/task.interface';
import { taskService } from '../services/tasks.service';

import { EntityController } from './entity.controller';

class TasksController extends EntityController<ITask> {
	constructor() {
		super(taskService);
	}
}

export const tasksController = new TasksController();
