import { Entity } from './entity.interface';
import { LinkableEntity } from './linkable-entity.interface';

export interface ITask {
	status: Status;
	storyPoints: number;
}

export type Task = Entity<LinkableEntity<ITask>>;

export type Status = 'open' | 'inProgress' | 'done';
