import Router from 'express';
import TasksController from '../controller/tasks.controller';

export function makeTasksRouter() {
	const router = Router();

	router.get('/:projectId', TasksController.getTasksByProjectId);
	router.get('/:taskId', TasksController.getTaskById);
	router.post('/:projectId', TasksController.createTask);
	router.put('/:taskId', TasksController.updateTask);
	router.delete('/:taskId', TasksController.deleteTask);

	return router;
}
