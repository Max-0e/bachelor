import { Document } from 'mongoose';

export interface IEntity {
	_id: string;
	name: string;
}

export type Entity<T> = IEntity & T;

export type EntityDocument<T> = Document & Entity<T>;
