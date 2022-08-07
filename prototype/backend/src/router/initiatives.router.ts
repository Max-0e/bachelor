import { IInitiativeDto } from '@/interfaces/dtos/initiativeDto.interface';
import { IInitiative } from '@/interfaces/initiative.interface';
import InitiativesController from '../controller/initiative.controller';
import { makeEntityRouter } from './entity.router';

export function makeInitiativesRouter() {
	const router = makeEntityRouter<IInitiative, IInitiativeDto>(InitiativesController);

	router.post('/:initiativeId/addProject/:projectId', InitiativesController.addProjectToInitiative);
	router.delete('/:initiativeId/removeProject/:projectId', InitiativesController.removeProjectFromInitiative);

	return router;
}
