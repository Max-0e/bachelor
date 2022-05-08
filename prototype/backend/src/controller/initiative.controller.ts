import sendResponse from '../utility/sendResponse';
import { NextFunction, Request, Response } from 'express';
import initiativeService from '../services/initiative.service';

class InitiativesController {
	public async getInitiatives(req: Request, res: Response): Promise<Response> {
		const initiatives = await initiativeService.getInitiatives();
		return await sendResponse.data(res, 200, initiativeService.mapArrayToDtoArray(initiatives));
	}

	public async getInitiativeById(req: Request, res: Response): Promise<Response> {
		const initiative = await initiativeService.getInitiativeById(req.params.initiativeId);
		return await sendResponse.data(res, 200, initiativeService.mapToDto(initiative));
	}

	public async createInitiative(req: Request, res: Response): Promise<Response> {
		const initiative = await initiativeService.createInitiative(req.body);
		return await sendResponse.data(res, 201, initiativeService.mapToDto(initiative));
	}

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

	public async updateInitiative(req: Request, res: Response): Promise<Response> {
		const initiative = await initiativeService.updateInitiative(req.params.initiativeId, req.body);
		return await sendResponse.data(res, 203, initiativeService.mapToDto(initiative));
	}

	public async deleteInitiative(req: Request, res: Response): Promise<Response> {
		await initiativeService.deleteInitiativeById(req.params.initiativeId);
		return await sendResponse.message(res, 204, 'success');
	}
}

export default new InitiativesController();
