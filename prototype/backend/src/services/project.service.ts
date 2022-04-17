import { ProjectModel, ProjectDocument } from '../models/project.model';
import { NotFoundError } from '../error/not-found.error';
import { IProject } from '../interfaces/project.interface';

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
}

export default new UserService();
