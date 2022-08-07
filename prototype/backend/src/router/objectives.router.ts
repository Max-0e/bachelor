import { IObjectiveDto } from '@/interfaces/dtos/objectiveDto.interface';
import { IObjective } from '@/interfaces/objective.interface';
import ObjectivesController from '../controller/objective.controller';
import { makeEntityRouter } from './entity.router';

export function makeObjectivesRouter() {
	const router = makeEntityRouter<IObjective, IObjectiveDto>(ObjectivesController);

	router.post(
		'/:objectiveId/addInitiative/:initiativeId',
		ObjectivesController.addInitiativeToObjective
	);
	router.delete(
		'/:objectiveId/removeInitiative/:initiativeId',
		ObjectivesController.removeInitiativeFromObjective
	);

	return router;
}
