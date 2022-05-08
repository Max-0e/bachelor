import Router from 'express';
import InitiativesController from '../controller/initiative.controller';

export function makeInitiativesRouter() {
	const router = Router();

	router.get('/', InitiativesController.getInitiatives);
	router.get('/:initiativeId', InitiativesController.getInitiativeById);
	router.post('/', InitiativesController.createInitiative);
	router.post('/:initiativeId/addProject/:projectId', InitiativesController.addProjectToInitiative);
	router.put('/:initiativeId', InitiativesController.updateInitiative);
	router.delete(
		'/:initiativeId/removeProject/:projectId',
		InitiativesController.removeProjectFromInitiative
	);
	router.delete('/:initiativeId', InitiativesController.deleteInitiative);

	return router;
}
