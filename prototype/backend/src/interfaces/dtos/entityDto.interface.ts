export type EntityReadDto<T> = {
	id: string;
	name: string;
	entityGroupIds: string[];
} & T;

export type EntityCreateDto<T> = {
	name: string;
	entityGroupIds: string[];
} & T;