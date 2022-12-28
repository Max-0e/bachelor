import { Entity } from "./entity.interface";

export interface ITask {
	status: Status;
	storyPoints: number;
}

export type Task = Entity<ITask>

export type Status = 'open' | 'inProgress' | 'done'
