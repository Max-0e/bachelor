import { Entity } from './entity.interface';

export interface IOrganization {
	useEpics: boolean;
}

export type Level = Entity<IOrganization>;
