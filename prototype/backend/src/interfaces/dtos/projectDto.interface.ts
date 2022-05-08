import { TaskDto } from './taskDto.interface';

export interface IProjectDto {
	id: string;
	name: string;
	tasks: TaskDto[];
}
