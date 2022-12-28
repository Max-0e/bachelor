import { ILevel } from '@/intefaces/level.interface';
import { levelService } from '@/services/level.service';
import {
	defineEntityStore,
	EntityState,
	getEntityStateDefaults,
} from './entity.store';

const makeLevelGetters = () => ({
	getNextHirachyLevel(state: EntityState<ILevel>) {
		return state.entities.length;
	},
});

const makeLevelActions = () => ({});

export const useLevelStore = defineEntityStore<
	ILevel,
	ReturnType<typeof makeLevelGetters>,
	ReturnType<typeof makeLevelActions>
>(
	'level',
	levelService,
	getEntityStateDefaults(),
	makeLevelGetters(),
	makeLevelActions
);
