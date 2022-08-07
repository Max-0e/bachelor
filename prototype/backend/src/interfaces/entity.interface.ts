import { Model, Document } from "mongoose";

export interface IEntity {
	_id: string;
}
export type EntityDocument<T> = Document & T;

// export type EntityModel<T> = Model<T>;