import sendResponse from '../utility/sendResponse';
import { NextFunction, Request, Response } from 'express';
import objectiveService from '../services/objective.service';
import { EntityController } from './entity.controller';
import { IObjective } from '@/interfaces/objective.interface';
import { IObjectiveDto } from '@/interfaces/dtos/objectiveDto.interface';

class ObjectivesController extends EntityController<IObjective, IObjectiveDto> {
	constructor () { super(objectiveService)}

	public async addInitiativeToObjective(req: Request, res: Response): Promise<Response> {
		const objective = await objectiveService.addInitiativeToObjective(
			req.params.objectiveId,
			req.params.initiativeId
		);
		return await sendResponse.data(res, 203, objectiveService.mapToDto(objective));
	}

	public async removeInitiativeFromObjective(req: Request, res: Response): Promise<Response> {
		const objective = await objectiveService.removeInitiativeFromObjective(
			req.params.objectiveId,
			req.params.initiativeId
		);
		return await sendResponse.data(res, 203, objectiveService.mapToDto(objective));
	}
}

export default new ObjectivesController();
