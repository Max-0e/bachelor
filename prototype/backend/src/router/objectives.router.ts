import Router from 'express';
import ObjectivesController from '../controller/objective.controller';

export function makeObjectivesRouter() {
	const router = Router();

	router.get('/', ObjectivesController.getObjectives);
	router.get('/:objectiveId', ObjectivesController.getObjectiveById);
	router.post('/', ObjectivesController.createObjective);
	router.post(
		'/:objectiveId/addInitiative/:initiativeId',
		ObjectivesController.addInitiativeToObjective
	);
	router.put('/:objectiveId', ObjectivesController.updateObjective);
	router.delete(
		'/:objectiveId/removeInitiative/:initiativeId',
		ObjectivesController.removeInitiativeFromObjective
	);
	router.delete('/:objectiveId', ObjectivesController.deleteObjective);

	return router;
}
