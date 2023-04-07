import { Entity } from './base/entity.interface';
import { LinkableEntity } from './base/linkable-entity.interface';

export interface IEntityGroup {
	levelId: string;
}

export type EntityGroup = Entity<LinkableEntity<IEntityGroup>>;
