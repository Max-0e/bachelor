import sendResponse from '../utility/sendResponse';
import { NextFunction, Request, Response } from 'express';
import objectiveService from '../services/objective.service';

class ObjectivesController {
	public async getObjectives(req: Request, res: Response): Promise<Response> {
		const objectives = await objectiveService.getObjectives();
		return await sendResponse.data(res, 200, objectiveService.mapArrayToDtoArray(objectives));
	}

	public async getObjectiveById(req: Request, res: Response): Promise<Response> {
		const objective = await objectiveService.getObjectiveById(req.params.objectiveId);
		return await sendResponse.data(res, 200, objectiveService.mapToDto(objective));
	}

	public async createObjective(req: Request, res: Response): Promise<Response> {
		const objective = await objectiveService.createObjective(req.body);
		return await sendResponse.data(res, 201, objectiveService.mapToDto(objective));
	}

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

	public async updateObjective(req: Request, res: Response): Promise<Response> {
		const objective = await objectiveService.updateObjective(req.params.objectiveId, req.body);
		return await sendResponse.data(res, 203, objectiveService.mapToDto(objective));
	}

	public async deleteObjective(req: Request, res: Response): Promise<Response> {
		await objectiveService.deleteObjectiveById(req.params.objectiveId);
		return await sendResponse.message(res, 204, 'success');
	}
}

export default new ObjectivesController();
