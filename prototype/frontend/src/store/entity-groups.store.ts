import { IEntityGroup } from '@/intefaces/entity-groups.interface';
import { LinkableEntity } from '@/intefaces/linkable-entity.interface';

import { entityGroupsService } from '@/services/entity-groups.service';
import { useRouter } from 'vue-router';
import { EntityState } from './entity.store';
import { useLevelStore } from './level.store';
import { defineLinkableEntityStore } from './linkable-entity.store';
import { getOrganizationBasedEntityStateDefaults } from './organization-based-entity.store';

const makeEntityGroupGetters = () => ({
	currentGroups(state: EntityState<LinkableEntity<IEntityGroup>>) {
		const currentLevelId = useRouter().currentRoute.value.params['levelId'];
		return state.entities.filter((entity) => entity.levelId === currentLevelId);
	},
	downwardsLinkedGroupsForCurrentGroup(
		state: EntityState<LinkableEntity<IEntityGroup>>
	) {
		const levelBelow = useLevelStore().getLowerLevel;
		if (!levelBelow) return [];
		return state.entities.filter(
			(entity) =>
				entity.levelId === levelBelow.id &&
				entity.entityGroupIds.includes((this as any).currentEntity.id)
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
