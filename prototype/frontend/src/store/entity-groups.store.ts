import { IEntityGroup } from '@/intefaces/entity-groups.interface';
import { entityGroupsService } from '@/services/entity-groups.service';
import { defineEntityStore, getEntityStateDefaults } from './entity.store';

const makeEntityGroupGetters = () => ({});

const makeEntityGroupActions = () => ({});

export const useGroupStore = defineEntityStore<
	IEntityGroup,
	ReturnType<typeof makeEntityGroupGetters>,
	ReturnType<typeof makeEntityGroupActions>
>(
	'group',
	entityGroupsService,
	getEntityStateDefaults(),
	makeEntityGroupGetters(),
	makeEntityGroupActions()
);
