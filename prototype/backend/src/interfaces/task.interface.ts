import { Entity } from "./entity.interface";

export interface ITask {
	status: Status;
	storyPoints: number;
}

export type Task = Entity<ITask>;
export const statusEnum = ['open', 'inProgress', 'done'] as const;
export type Status = typeof statusEnum[number];
