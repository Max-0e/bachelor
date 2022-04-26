import { ProjectModel, ProjectDocument } from '../models/project.model';
import { NotFoundError } from '../error/not-found.error';
import { IProject, IProjectModel } from '../interfaces/project.interface';
import { IProjectDto } from '@/interfaces/dtos/projectDto.interface';
import taskService from './task.service';

class UserService {
    public async getProjects() {
        const projects: ProjectDocument[] = await ProjectModel.find();
        return projects;
    }
	public async getProjectById(projectId: string) {
		const project: ProjectDocument | null = await ProjectModel.findOne({ _id: projectId });
		if (!project) throw new NotFoundError('This Project does not exists.');

		return project;
	}

	public async createProject(project: IProject) {
        const projectModel = new ProjectModel({ ...project });
		return await projectModel.save();
	}

	public async updateProject(projectId: string, project: IProject) {
        const projectToUpdate = await this.getProjectById(projectId);
        await projectToUpdate.updateOne(project);
        return await projectToUpdate.save();
	}

    public async deleteProjectById(id: string) {
        const project = await this.getProjectById(id);
        return project.delete();
    }
    
    public async mapModel (projectModel: ProjectDocument): Promise<IProject>{
        return await projectModel.populate('task');
    }

    public async mapModelArray(projectModels: ProjectDocument[]) {
        return await Promise.all(projectModels.map(projectModel => this.mapModel(projectModel)));
    }

    public mapToProjectDto(project: IProject): IProjectDto{
        return {
            id: project._id,
            name: project.name,
            tasks: taskService.mapArrayToDtoArray(project.tasks)
        }
    }
    
    public mapArrayToProjectDtoArray(projects: IProject[]): IProjectDto[]{
        return projects.map(project => this.mapToProjectDto(project));
    }
}

export default new UserService();
