import { Entity } from './base/entity.interface';

export interface ILevel {
	hierarchyLevel: number;
}

export type Level = Entity<ILevel>;
