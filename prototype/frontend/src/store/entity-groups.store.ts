import { IEntityGroup } from '@/intefaces/entity-groups.interface';
import { LinkableEntity } from '@/intefaces/linkable-entity.interface';
import router from '@/router';
import { entityGroupsService } from '@/services/entity-groups.service';
import { EntityState } from './entity.store';
import { defineLinkableEntityStore } from './linkable-entity.store';
import { getOrganizationBasedEntityStateDefaults } from './organization-based-entity.store';

const makeEntityGroupGetters = () => ({
	currentGroups(state: EntityState<LinkableEntity<IEntityGroup>>) {
		const currentLevelId = router.currentRoute.value.params['levelId'];
		return state.entities.filter((entity) => entity.levelId === currentLevelId);
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
