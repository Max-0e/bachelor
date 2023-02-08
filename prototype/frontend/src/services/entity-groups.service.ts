import { IEntityGroup } from '@/intefaces/entity-groups.interface';
import { LinkableEntityService } from './linkable-entity.service';

class EntityGroupsService extends LinkableEntityService<IEntityGroup> {}

export const entityGroupsService = new EntityGroupsService('groups');
