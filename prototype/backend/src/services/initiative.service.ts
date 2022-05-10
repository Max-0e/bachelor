import { InitiativeModel, InitiativeDocument } from '../models/initiative.model';
import { NotFoundError } from '../error/not-found.error';
import { IInitiative } from '../interfaces/initiative.interface';
import projectService from './project.service';
import { IInitiativeDto } from '../interfaces/dtos/initiativeDto.interface';
import { ValidationError } from '../error/validation.error';
import objectiveService from './objective.service';

class InitiativeService {
	public async getInitiatives() {
		const initiatives: InitiativeDocument[] = await InitiativeModel.find();
		return initiatives;
	}

	public async getInitiativeById(initiativeId: string) {
		const initiative: InitiativeDocument | null = await InitiativeModel.findOne({
			_id: initiativeId,
		});
		if (!initiative) throw new NotFoundError('This Initiative does not exists.');

		return initiative;
	}

	public async getInitiativesContainingProject(projectId: string) {
		const initiatives: InitiativeDocument[] | null = await InitiativeModel.find({
			projects: projectId,
		});
		if (!initiatives) throw new NotFoundError('This Project is not part of any Initiative.');

		return initiatives;
	}

	public async createInitiative(initiative: IInitiative) {
		const initiativeModel = new InitiativeModel({ ...initiative });
		const newInitiative = await initiativeModel.save();

		return newInitiative;
	}

	public async addProjectToInitiative(initiativeId: string, projectId: string) {
		const initiativeToUpdate = await this.getInitiativeById(initiativeId);
		// validate ProjectId
		await projectService.getProjectById(projectId);

		initiativeToUpdate.projects.push(projectId);
		await initiativeToUpdate.save();

		return await this.getInitiativeById(initiativeId);
	}

	public async removeProjectFromInitiative(initiativeId: string, projectId: string) {
		const initiativeToUpdate = await this.getInitiativeById(initiativeId);
		// validate ProjectId
		await projectService.getProjectById(projectId);

		if (!initiativeToUpdate.projects.includes(projectId))
			throw new ValidationError('project is not part of initiative');
		// TODO is there another way?
		initiativeToUpdate.projects = initiativeToUpdate.projects.filter(
			(projectIdFromDocument) => !projectIdFromDocument.toString().includes(projectId)
		);

		await initiativeToUpdate.save();

		return await this.getInitiativeById(initiativeId);
	}

	public async updateInitiative(initiativeId: string, initiative: IInitiative) {
		const initiativeToUpdate = await this.getInitiativeById(initiativeId);
		await initiativeToUpdate.updateOne(initiative);
		return await this.getInitiativeById(initiativeId);
	}

	public async deleteInitiativeById(id: string) {
		const initiative = await this.getInitiativeById(id);
		try {
			const objectivesToRemoveInitiativeFrom = await objectiveService.getObjectivesContainingInitiative(id);
			for (const objective of objectivesToRemoveInitiativeFrom ) {
				await objectiveService.removeInitiativeFromObjective(objective._id, id);
			}
		} catch (error: any) {
			if (error.status !== 404) throw error;
		}
		return initiative.delete();
	}

	public mapToDto(initiative: IInitiative): IInitiativeDto {
		return {
			id: initiative._id,
			name: initiative.name,
			projects: initiative.projects,
		};
	}

	public mapArrayToDtoArray(initiatives: IInitiative[]): IInitiativeDto[] {
		return initiatives.map((initiative) => this.mapToDto(initiative));
	}
}

export default new InitiativeService();
