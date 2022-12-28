import { tasksController } from '../controller/tasks.controller';
import { ITask } from '../interfaces/task.interface';
import { makeEntityRouter } from './entity.router';

export function makeTasksRouter() {
	const router = makeEntityRouter<ITask>(tasksController);

	return router;
}
