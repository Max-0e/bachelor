import { TaskDto } from "./taskDto.interface";

export interface IProject {
    id: string;
	name: string;
    tasks: TaskDto[]
}
