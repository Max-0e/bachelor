import { Entity } from './base/entity.interface';
import { LinkableEntity } from './base/linkable-entity.interface';
import { OrganizationBasedEntity } from './base/organization-based-entity.interface';

export interface ITask {
	status: Status;
	storyPoints: number;
	value: number;
}

export type Task = Entity<LinkableEntity<OrganizationBasedEntity<ITask>>>;
export const statusEnum = ['open', 'inProgress', 'done'] as const;
export type Status = typeof statusEnum[number];
