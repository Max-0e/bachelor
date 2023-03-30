import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { ILevel } from '@/interfaces/level.interface';
import { levelService } from '@/services/level.service';
import {
	defineOrganizationBasedEntityStore,
	getOrganizationBasedEntityStateDefaults,
	OrganizationBasedEntityState,
} from './base/organization-based-entity.store';
import { useOrganizationStore } from './organization.store';

const makeLevelGetters = () => ({
	getNextHierarchyLevel(state: OrganizationBasedEntityState<ILevel>) {
		const currentOrganization = useOrganizationStore().currentEntity;
		if (!currentOrganization) return 0;
		return state.entities.filter(
			({ organizationId }) => organizationId === currentOrganization.id
		).length;
	},
	isProjectLevel(state: OrganizationBasedEntityState<ILevel>) {
		return (levelId: string) => {
			const projectLevel = useOrganizationStore().currentEntity?.useEpics
				? 1
				: 0;
			return (
				state.entities.find((level) => level.id === levelId)?.hierarchyLevel ===
				projectLevel
			);
		};
	},
	getLowerLevel(state: OrganizationBasedEntityState<ILevel>) {
		const currentLevel: Entity<OrganizationBasedEntity<ILevel>> = (this as any)
			.currentEntity;

		if (!currentLevel) return;

		return state.entities.find(
			(x) =>
				x.organizationId === currentLevel.organizationId &&
				x.hierarchyLevel === currentLevel.hierarchyLevel - 1
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
