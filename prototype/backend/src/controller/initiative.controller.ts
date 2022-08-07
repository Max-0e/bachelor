import sendResponse from '../utility/sendResponse';
import { NextFunction, Request, Response } from 'express';
import initiativeService from '../services/initiative.service';
import { IInitiative } from '@/interfaces/initiative.interface';
import { IInitiativeDto } from '@/interfaces/dtos/initiativeDto.interface';
import { EntityController } from './entity.controller';

class InitiativesController extends EntityController<IInitiative, IInitiativeDto> {
	constructor () { super(initiativeService)}
	
	public async addProjectToInitiative(req: Request, res: Response): Promise<Response> {
		const initiative = await initiativeService.addProjectToInitiative(
			req.params.initiativeId,
			req.params.projectId
		);
		return await sendResponse.data(res, 203, initiativeService.mapToDto(initiative));
	}

	public async removeProjectFromInitiative(req: Request, res: Response): Promise<Response> {
		const initiative = await initiativeService.removeProjectFromInitiative(
			req.params.initiativeId,
			req.params.projectId
		);
		return await sendResponse.data(res, 203, initiativeService.mapToDto(initiative));
	}
}

export default new InitiativesController();
