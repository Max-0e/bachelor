export interface ITask {
	id: string;
	name: string;
	status: Status;
}

export interface ICreateTask {
	name: string;
	status: Status;
}

export enum Status {
	open,
	inProgress,
	done
}
