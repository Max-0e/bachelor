import { Document } from 'mongoose';

export interface IEntity {
	_id: string;
	name: string;
}

export type Entity<T> = {
	_id: string;
	name: string;
} & T;

export type EntityDocument<T> = Document & Entity<T>;
