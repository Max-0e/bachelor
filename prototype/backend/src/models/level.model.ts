import { ILevel } from '../interfaces/level.interface';
import { makeOrganizationBasedEntityModel } from './origanization-based-entity.model';

export const LevelModel = makeOrganizationBasedEntityModel<ILevel>('Level', {
	hirarchyLevel: { type: Number, required: true },
});
