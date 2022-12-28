
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { entityGroupsService } from '../services/entity-groups.service';

import { EntityController } from './entity.controller';

class EntityGroupsController extends EntityController<IEntityGroup> {
    constructor() {
        super(entityGroupsService);
    }
}

export const entityGroupsController = new EntityGroupsController();
