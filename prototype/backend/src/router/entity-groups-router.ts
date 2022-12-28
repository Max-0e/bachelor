import { entityGroupsController } from '../controller/entity-groups.controller';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { makeEntityRouter } from './entity.router';

export function makeEntityGroupsRouter() {
    const router = makeEntityRouter<IEntityGroup>(entityGroupsController);

    return router;
}
