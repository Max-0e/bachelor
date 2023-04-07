export type EntityReadDto<T> = {
	id: string;
	name: string;
	description?: string;
} & T;

export type EntityCreateDto<T> = {
	name: string;
	description?: string;
} & T;
