import { Schema } from "mongoose";
import { IEntityGroup } from "../interfaces/entityGroup.interface";
import { makeEntityModel } from "../models/entity.model";
import { EntityService } from "./entity.service";

class EntityGroupsService extends EntityService<IEntityGroup>{
    constructor() {
        super(makeEntityModel('EntityGroup', {
            levelId: { type: Schema.Types.ObjectId, ref: 'Level' }
        }));
    }
}

export const entityGroupsService = new EntityGroupsService();
