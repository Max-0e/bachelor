import { Entity } from './entity.interface';

export interface IOrganization {
	useEpics: boolean;
}

export type Organization = Entity<IOrganization>;
