import { ITask } from './task.interface';

export interface IProject {
	_id: string;
	name: string;
	wipLimit: number;
	tasks: ITask[];
}

export interface IProjectModel {
	_id: string;
	name: string;
	wipLimit: number;
	tasks: string[];
}
