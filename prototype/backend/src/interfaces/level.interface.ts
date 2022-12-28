import { Entity } from "./entity.interface";

export interface ILevel {
    hirarchyLevel: number;
}

export type Level = Entity<ILevel>;