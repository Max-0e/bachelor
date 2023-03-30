import { Entity } from './entity.interface';
import { LinkableEntity } from './linkable-entity.interface';
import { OrganizationBasedEntity } from './organization-based-entity.interface';

export interface ITask {
	status: Status;
	description: string;
	storyPoints: number;
	value: number;
}

export type Task = Entity<LinkableEntity<OrganizationBasedEntity<ITask>>>;
export const statusEnum = ['open', 'inProgress', 'done'] as const;
export type Status = typeof statusEnum[number];
