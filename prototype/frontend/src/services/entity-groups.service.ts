import { IEntityGroup } from "@/intefaces/entity-groups.interface";
import { EntityService } from "./entity.service";

class EntityGroupsService extends EntityService<IEntityGroup>{
}

export const entityGroupsService = new EntityGroupsService('groups');
