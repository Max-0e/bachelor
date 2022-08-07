import projectsController from '../controller/projects.controller';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import { IProjectModel } from '@/interfaces/project.interface';
import { makeEntityRouter } from './entity.router';

export function makeProjectsRouter() {
	const router = makeEntityRouter<IProjectModel, IProjectDto>(projectsController);

	return router;
}
