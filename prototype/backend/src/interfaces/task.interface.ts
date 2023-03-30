import { Entity } from './entity.interface';
import { LinkableEntity } from './linkable-entity.interface';

export interface ITask {
	status: Status;
	description: string;
	storyPoints: number;
	value: number;
}

export type Task = Entity<LinkableEntity<ITask>>;
export const statusEnum = ['open', 'inProgress', 'done'] as const;
export type Status = typeof statusEnum[number];
