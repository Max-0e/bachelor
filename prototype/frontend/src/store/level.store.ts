import { Entity } from '@/interfaces/entity.interface';
import { ILevel } from '@/interfaces/level.interface';
import { OrganizationBasedEntity } from '@/interfaces/organization-based-entity.interface';
import { levelService } from '@/services/level.service';
import {
	defineOrganizationBasedEntityStore,
	getOrganizationBasedEntityStateDefaults,
	OrganizationBasedEntityState,
} from './organization-based-entity.store';
import { useOrganizationStore } from './organization.store';

const makeLevelGetters = () => ({
	getNextHirachyLevel(state: OrganizationBasedEntityState<ILevel>) {
		const currentOrganization = useOrganizationStore().currentEntity;
		if (!currentOrganization) return 0;
		return state.entities.filter(
			({ organizationId }) => organizationId === currentOrganization.id
		).length;
	},
	getLowerLevel(state: OrganizationBasedEntityState<ILevel>) {
		const currentLevel: Entity<OrganizationBasedEntity<ILevel>> = (this as any)
			.currentEntity;

		if (!currentLevel) return;

		return state.entities.find(
			(x) =>
				x.organizationId === currentLevel.organizationId &&
				x.hirarchyLevel === currentLevel.hirarchyLevel - 1
		);
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
