import { entityGroupsController } from '../controller/entity-groups.controller';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { makeLinkableEntityRouter } from './linkable-entity.router';

export function makeEntityGroupsRouter() {
	const router = makeLinkableEntityRouter<IEntityGroup>(entityGroupsController);

	return router;
}
