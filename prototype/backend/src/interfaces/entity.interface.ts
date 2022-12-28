import { Document } from "mongoose";

export type Entity<T> = {
	_id: string;
	name: string;
	entityGroupIds: string[];
} & T;

export type EntityDocument<T> = Document & Entity<T>;
