interface IEntity extends IEntityCreate {
	id: string;
}

interface IEntityCreate {
	name: string;
	entityGroupIds: string[];
}

export type Entity<T> = IEntity & T;

export type EntityCreate<T> = IEntityCreate & T;