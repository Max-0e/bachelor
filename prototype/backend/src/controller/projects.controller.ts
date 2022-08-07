import projectService from '../services/project.service';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import { IProjectModel } from '@/interfaces/project.interface';
import { EntityController } from './entity.controller';

class ProjectsController extends EntityController<IProjectModel, IProjectDto> {
	constructor () { super(projectService) }
}

export default new ProjectsController();
