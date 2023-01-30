export type EntityReadDto<T> = {
	id: string;
	name: string;
} & T;

export type EntityCreateDto<T> = {
	name: string;
} & T;
