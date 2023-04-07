import { Entity } from './base/entity.interface';
import { OrganizationBasedEntity } from './base/organization-based-entity.interface';

export interface ILevel {
	hierarchyLevel: number;
}

export type Level = Entity<OrganizationBasedEntity<ILevel>>;
