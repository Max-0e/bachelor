import { Status } from '../task.interface';

export interface TaskDto {
	id: string;
	name: string;
	status: Status;
}
