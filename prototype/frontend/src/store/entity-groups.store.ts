import { IEntityGroup } from '@/interfaces/entity-groups.interface';
import { LinkableEntity } from '@/interfaces/linkable-entity.interface';

import { entityGroupsService } from '@/services/entity-groups.service';
import { useRouter } from 'vue-router';
import { useLevelStore } from './level.store';
import {
	defineLinkableEntityStore,
	LinkableEntityStore,
} from './linkable-entity.store';
import {
	getOrganizationBasedEntityStateDefaults,
	OrganizationBasedEntityState,
} from './organization-based-entity.store';

const makeEntityGroupGetters = () => ({
	currentGroups(
		state: OrganizationBasedEntityState<LinkableEntity<IEntityGroup>>
	) {
		const currentLevelId = useRouter().currentRoute.value.params['levelId'];
		return state.entities.filter((entity) => entity.levelId === currentLevelId);
	},
	downwardsLinkedGroupsForCurrentGroup(
		this: LinkableEntityStore<IEntityGroup>,
		state: OrganizationBasedEntityState<LinkableEntity<IEntityGroup>>
	) {
		const levelBelow = useLevelStore().getLowerLevel;
		if (!levelBelow) return [];
		return state.entities.filter(
			(entity) =>
				entity.levelId === levelBelow.id &&
				entity.entityGroupIds.includes((this.currentEntity as any)?.id)
		);
	},
});

const makeEntityGroupActions = () => ({});

export const useGroupStore = defineLinkableEntityStore<
	IEntityGroup,
	ReturnType<typeof makeEntityGroupGetters>,
	ReturnType<typeof makeEntityGroupActions>
>(
	'group',
	entityGroupsService,
	getOrganizationBasedEntityStateDefaults(),
	makeEntityGroupGetters(),
	makeEntityGroupActions()
);
