export interface IEntity {
	id: string;
	name: string;
}

export interface IEntityCreate {
	name: string;
}

export type Entity<T> = IEntity & T;

export type EntityCreate<T> = IEntityCreate & T;
