import { Entity } from "./entity.interface";

export interface IEntityGroup {
    levelId: string;
}

export type EntityGroup = Entity<IEntityGroup>