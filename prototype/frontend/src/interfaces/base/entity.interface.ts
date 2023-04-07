export interface IEntity {
	id: string;
	name: string;
	description: string;
}

export interface IEntityCreate {
	name: string;
	description: string;
}

export type Entity<T> = IEntity & T;

export type EntityCreate<T> = IEntityCreate & T;
