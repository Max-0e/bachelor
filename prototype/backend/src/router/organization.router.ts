import { organizationController } from '../controller/organization.controller';
import { IOrganization } from '../interfaces/organization.interface';
import { makeEntityGroupsRouter } from './entity-groups-router';
import { makeEntityRouter } from './entity.router';
import { makeLevelRouter } from './level.router';
import { makeTasksRouter } from './tasks.router';

export function makeOrganizationRouter() {
	const router = makeEntityRouter<IOrganization>(organizationController);
	router.use('/levels', makeLevelRouter());
	router.use('/tasks', makeTasksRouter());
	router.use('/groups', makeEntityGroupsRouter());
	return router;
}
