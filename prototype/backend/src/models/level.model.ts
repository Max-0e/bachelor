import { ILevel } from '../interfaces/level.interface';
import { makeOrganizationBasedEntityModel } from './base/origanization-based-entity.model';

export const LevelModel = makeOrganizationBasedEntityModel<ILevel>('Level', {
	hierarchyLevel: { type: Number, required: true },
});
