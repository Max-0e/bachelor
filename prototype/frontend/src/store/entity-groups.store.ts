import {
	EntityGroup,
	IEntityGroup,
} from '@/interfaces/entity-groups.interface';
import { entityGroupsService } from '@/services/entity-groups.service';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { makeLinkableEntityActions } from './base/linkable-entity.store/linkable-entity.actions';
import {
	LinkableEntityGetters,
	makeLinkableEntityGetters,
} from './base/linkable-entity.store/linkable-entity.getters';
import { makeLinkableEntityState } from './base/linkable-entity.store/linkable-entity.state';
import {
	LinkableEntityStore,
	LinkableEntityStoreDefinition,
} from './base/linkable-entity.store/linkable-entity.store';
import { PiniaStore } from './base/piniaTypes';
import { useLevelStore } from './level.store';

interface GroupGetters extends LinkableEntityGetters<IEntityGroup> {
	currentGroups(): EntityGroup[];
	downwardsLinkedGroupsForCurrentGroup(): EntityGroup[];
}

type GroupStore = LinkableEntityStore<IEntityGroup, 'group', GroupGetters>;
type GroupStoreDefinition = LinkableEntityStoreDefinition<
	IEntityGroup,
	'group',
	GroupGetters
>;

const groupStore: PiniaStore<GroupStore> = {
	state: makeLinkableEntityState<IEntityGroup>(entityGroupsService),
	getters: {
		...makeLinkableEntityGetters<IEntityGroup>(),
		currentGroups(state) {
			const currentLevelId = useRouter().currentRoute.value.params['levelId'];
			return state.entities.filter(
				(entity) => entity.levelId === currentLevelId
			);
		},
		downwardsLinkedGroupsForCurrentGroup(state) {
			const levelBelow = useLevelStore().getLowerLevel;
			if (!levelBelow) return [];
			return state.entities.filter(
				(entity) =>
					entity.levelId === levelBelow.id &&
					entity.entityGroupIds.includes(state.currentEntity?.id)
			);
		},
	},
	actions: makeLinkableEntityActions<IEntityGroup>(),
};

export const useGroupStore: GroupStoreDefinition = defineStore(
	'group',
	groupStore
);
