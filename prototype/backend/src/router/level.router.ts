import { levelController } from '../controller/level.controller';
import { ILevel } from '../interfaces/level.interface';
import { makeOrganizationBasedEntityRouter } from './organization-based-entity.router';

export function makeLevelRouter() {
	return makeOrganizationBasedEntityRouter<ILevel>(levelController);
}
