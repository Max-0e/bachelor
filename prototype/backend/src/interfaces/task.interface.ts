export interface ITask {
	_id: string;
	name: string;
	status: Status;
}

export enum Status {
	open,
	inProgress,
	done
}
