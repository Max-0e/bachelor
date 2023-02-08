import { Entity } from './entity.interface';
import { LinkableEntity } from './linkable-entity.interface';
import { OrganizationBasedEntity } from './organization-based-entity.interface';

export interface IEntityGroup {
	levelId: string;
}

export type EntityGroup = Entity<
	LinkableEntity<OrganizationBasedEntity<IEntityGroup>>
>;
