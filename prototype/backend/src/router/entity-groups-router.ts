import { entityGroupsController } from '../controller/entity-groups.controller';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { makeLinkableEntityRouter } from './base/linkable-entity.router';

export function makeEntityGroupsRouter() {
	return makeLinkableEntityRouter<IEntityGroup>(entityGroupsController);
}
