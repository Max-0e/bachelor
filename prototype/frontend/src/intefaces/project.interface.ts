import { ITask } from './task.interface';

export interface IProject {
	id: string;
	name: string;
	wipLimit: number;
	tasks: ITask[];
}

export interface ICreateProject {
	name: string;
}
export interface IUpdateProject {
	name: string;
	wipLimit: number;
}
