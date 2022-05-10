import { ObjectiveModel, ObjectiveDocument } from '../models/objective.model';
import { NotFoundError } from '../error/not-found.error';
import { IObjective } from '../interfaces/objective.interface';
import initiativeService from './initiative.service';
import { IObjectiveDto } from '../interfaces/dtos/objectiveDto.interface';
import { ValidationError } from '../error/validation.error';

class ObjectiveService {
	public async getObjectives() {
		const objectives: ObjectiveDocument[] = await ObjectiveModel.find();
		return objectives;
	}

	public async getObjectiveById(objectiveId: string) {
		const objective: ObjectiveDocument | null = await ObjectiveModel.findOne({
			_id: objectiveId,
		});
		if (!objective) throw new NotFoundError('This Objective does not exists.');

		return objective;
	}

	public async getObjectivesContainingInitiative(initiativeId: string) {
		const objectives: ObjectiveDocument[] | null = await ObjectiveModel.find({
			initiatives: initiativeId,
		});
		if (!objectives) throw new NotFoundError('This Initiative is not part of any Objective.');

		return objectives;
	}

	public async createObjective(objective: IObjective) {
		const objectiveModel = new ObjectiveModel({ ...objective });
		const newObjective = await objectiveModel.save();

		return newObjective;
	}

	public async addInitiativeToObjective(objectiveId: string, initiativeId: string) {
		const objectiveToUpdate = await this.getObjectiveById(objectiveId);
		// validate InitiativeId
		await initiativeService.getInitiativeById(initiativeId);

		objectiveToUpdate.initiatives.push(initiativeId);
		await objectiveToUpdate.save();

		return await this.getObjectiveById(objectiveId);
	}

	public async removeInitiativeFromObjective(objectiveId: string, initiativeId: string) {
		const objectiveToUpdate = await this.getObjectiveById(objectiveId);
		// validate InitiativeId
		await initiativeService.getInitiativeById(initiativeId);

		if (!objectiveToUpdate.initiatives.includes(initiativeId))
			throw new ValidationError('initiative is not part of objective');

		objectiveToUpdate.initiatives = objectiveToUpdate.initiatives.filter(
			(initiativeIdFromDocument) => !initiativeIdFromDocument.toString().includes(initiativeId)
		);

		await objectiveToUpdate.save();

		return await this.getObjectiveById(objectiveId);
	}

	public async updateObjective(objectiveId: string, objective: IObjective) {
		const objectiveToUpdate = await this.getObjectiveById(objectiveId);
		await objectiveToUpdate.updateOne(objective);
		return await this.getObjectiveById(objectiveId);
	}

	public async deleteObjectiveById(id: string) {
		const objective = await this.getObjectiveById(id);
		return objective.delete();
	}

	public mapToDto(objective: IObjective): IObjectiveDto {
		return {
			id: objective._id,
			name: objective.name,
			initiatives: objective.initiatives,
		};
	}

	public mapArrayToDtoArray(objectives: IObjective[]): IObjectiveDto[] {
		return objectives.map((objective) => this.mapToDto(objective));
	}
}

export default new ObjectiveService();
