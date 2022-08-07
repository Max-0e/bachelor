import { ObjectiveModel, ObjectiveDocument } from '../models/objective.model';
import { NotFoundError } from '../error/not-found.error';
import { IObjective } from '../interfaces/objective.interface';
import initiativeService from './initiative.service';
import { IObjectiveDto } from '../interfaces/dtos/objectiveDto.interface';
import { ValidationError } from '../error/validation.error';
import { EntityService } from './entity.service';

class ObjectiveService extends EntityService<IObjective, IObjectiveDto> {
	constructor () {
		super(ObjectiveModel)
	}
	public async getObjectivesContainingInitiative(initiativeId: string) {
		const objectives: ObjectiveDocument[] | null = await ObjectiveModel.find({
			initiatives: initiativeId,
		});
		if (!objectives) throw new NotFoundError('This Initiative is not part of any Objective.');

		return objectives;
	}

	public async addInitiativeToObjective(objectiveId: string, initiativeId: string) {
		const objectiveToUpdate = await this.getEntityById(objectiveId);
		// validate InitiativeId
		await initiativeService.getInitiativeById(initiativeId);

		objectiveToUpdate.initiatives.push(initiativeId);
		await objectiveToUpdate.save();

		return await this.getEntityById(objectiveId);
	}

	public async removeInitiativeFromObjective(objectiveId: string, initiativeId: string) {
		const objectiveToUpdate = await this.getEntityById(objectiveId);
		// validate InitiativeId
		await initiativeService.getInitiativeById(initiativeId);

		if (!objectiveToUpdate.initiatives.includes(initiativeId))
			throw new ValidationError('initiative is not part of objective');

		objectiveToUpdate.initiatives = objectiveToUpdate.initiatives.filter(
			(initiativeIdFromDocument) => !initiativeIdFromDocument.toString().includes(initiativeId)
		);

		await objectiveToUpdate.save();

		return await this.getEntityById(objectiveId);
	}
}

export default new ObjectiveService();
