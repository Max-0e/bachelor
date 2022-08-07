import { InitiativeModel, InitiativeDocument } from '../models/initiative.model';
import { NotFoundError } from '../error/not-found.error';
import { IInitiative } from '../interfaces/initiative.interface';
import projectService from './project.service';
import { IInitiativeDto } from '../interfaces/dtos/initiativeDto.interface';
import { ValidationError } from '../error/validation.error';
import objectiveService from './objective.service';
import { ConflictError } from '../error/conflict.error';
import { EntityService } from './entity.service';

class InitiativeService extends EntityService<IInitiative, IInitiativeDto> {
	constructor () {
		super(InitiativeModel)
	}

	public async getInitiativesContainingProject(projectId: string) {
		const initiatives: InitiativeDocument[] | null = await InitiativeModel.find({
			projects: projectId,
		});
		if (!initiatives) throw new NotFoundError('This Project is not part of any Initiative.');

		return initiatives;
	}

	public async addProjectToInitiative(initiativeId: string, projectId: string) {
		const initiativeToUpdate = await this.getEntityById(initiativeId);
		// validate ProjectId
		await projectService.getEntityById(projectId);

		if (initiativeToUpdate.projects.includes(projectId))
			throw new ConflictError('Project already in Initiative.');

		initiativeToUpdate.projects.push(projectId);
		await initiativeToUpdate.save();

		return await this.getEntityById(initiativeId);
	}

	public async removeProjectFromInitiative(initiativeId: string, projectId: string) {
		const initiativeToUpdate = await this.getEntityById(initiativeId);
		// validate ProjectId
		await projectService.getEntityById(projectId);

		if (!initiativeToUpdate.projects.includes(projectId))
			throw new ValidationError('project is not part of initiative');
		// TODO is there another way?
		initiativeToUpdate.projects = initiativeToUpdate.projects.filter(
			(projectIdFromDocument) => !projectIdFromDocument.toString().includes(projectId)
		);

		await initiativeToUpdate.save();

		return await this.getEntityById(initiativeId);
	}

	public override async deleteEntityById (id: string) {
		const initiative = await this.getEntityById(id);
		try {
			const objectivesToRemoveInitiativeFrom =
				await objectiveService.getObjectivesContainingInitiative(id);
			for (const objective of objectivesToRemoveInitiativeFrom) {
				await objectiveService.removeInitiativeFromObjective(objective._id, id);
			}
		} catch (error: any) {
			if (error.status !== 404) throw error;
		}
		return initiative.delete();
	}
}

export default new InitiativeService();
