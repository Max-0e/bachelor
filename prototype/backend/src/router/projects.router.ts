import Router from 'express';
import ProjectsController from '../controller/projects.controller';

export function makeProjectsRouter() {
	const router = Router();

	router.get('/', ProjectsController.getProjects);
	router.get('/:projectId', ProjectsController.getProjectById);
	router.post('/', ProjectsController.createProject);
	router.put('/:projectId', ProjectsController.updateProject);
	router.delete('/:projectId', ProjectsController.deleteProject);

	return router;
}
