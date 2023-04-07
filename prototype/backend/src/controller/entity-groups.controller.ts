import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { entityGroupsService } from '../services/entity-groups.service';
import { LinkableEntityController } from './base/linkable-entity.controller';

class EntityGroupsController extends LinkableEntityController<IEntityGroup> {
	constructor() {
		super(entityGroupsService);
	}
}

export const entityGroupsController = new EntityGroupsController();
