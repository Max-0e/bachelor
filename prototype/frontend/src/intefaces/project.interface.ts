import { ITask } from "./task.interface";

export interface IProject {
	id: string;
	name: string;
	tasks: ITask[];
}

export interface ICreateProject {
	name: string;
}