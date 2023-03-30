import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { IEntityGroup } from '@/interfaces/entity-groups.interface';

import { entityGroupsService } from '@/services/entity-groups.service';
import { useRouter } from 'vue-router';
import {
	defineLinkableEntityStore,
	LinkableEntityStore,
} from './base/linkable-entity.store';
import {
	getOrganizationBasedEntityStateDefaults,
	OrganizationBasedEntityState,
} from './base/organization-based-entity.store';
import { useLevelStore } from './level.store';

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

export type EntityGroupStore = LinkableEntityStore<IEntityGroup>;
