import { tasksController } from '../controller/tasks.controller';
import { ITask } from '../interfaces/task.interface';
import { makeLinkableEntityRouter } from './base/linkable-entity.router';

export function makeTasksRouter() {
	const router = makeLinkableEntityRouter<ITask>(tasksController);

	return router;
}
