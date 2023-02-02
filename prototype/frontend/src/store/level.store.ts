import { ILevel } from '@/intefaces/level.interface';
import { levelService } from '@/services/level.service';
import {
	defineOrganizationBasedEntityStore,
	getOrganizationBasedEntityStateDefaults,
	OrganizationBasedEntityState,
} from './organization-based-entity.store';

const makeLevelGetters = () => ({
	getNextHirachyLevel(state: OrganizationBasedEntityState<ILevel>) {
		return state.entities.length;
	},
});

const makeLevelActions = () => ({});

export const useLevelStore = defineOrganizationBasedEntityStore<
	ILevel,
	ReturnType<typeof makeLevelGetters>,
	ReturnType<typeof makeLevelActions>
>(
	'level',
	levelService,
	getOrganizationBasedEntityStateDefaults(),
	makeLevelGetters(),
	makeLevelActions
);
