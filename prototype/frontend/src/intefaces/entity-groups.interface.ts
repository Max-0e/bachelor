import { Entity } from './entity.interface';
import { LinkableEntity } from './linkable-entity.interface';

export interface IEntityGroup {
	levelId: string;
}

export type EntityGroup = Entity<LinkableEntity<IEntityGroup>>;
