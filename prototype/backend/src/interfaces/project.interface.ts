import { ITask } from "./task.interface";

export interface IProject {
    _id: string;
	name: string;
    tasks: ITask[]
}

export interface IProjectModel {
    _id: string;
	name: string;
    tasks: string[];
}
