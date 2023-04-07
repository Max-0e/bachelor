import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { ILevel, Level } from '@/interfaces/level.interface';
import { levelService } from '@/services/level.service';
import { defineStore } from 'pinia';
import { makeOrganizationBasedEntityActions } from './base/organization-based-entity/organization-based-entity.action';
import {
	OrganizationBasedEntityGetters,
	makeOrganizationBasedEntityGetters,
} from './base/organization-based-entity/organization-based-entity.getters';
import {
	OrganizationBasedEntityState,
	makeOrganizationBasedEntityState,
} from './base/organization-based-entity/organization-based-entity.state';
import {
	OrganizationBasedEntityStore,
	OrganizationBasedEntityStoreDefinition,
} from './base/organization-based-entity/organization-based-entity.store';
import { PiniaStore } from './base/piniaTypes';
import { useOrganizationStore } from './organization.store';

interface LevelGetters extends OrganizationBasedEntityGetters<ILevel> {
	getNextHierarchyLevel(): number;
	isProjectLevel(): (levelId: string) => boolean;
	getLowerLevel(): Level | undefined;
}

type LevelStore = OrganizationBasedEntityStore<
	ILevel,
	'level',
	OrganizationBasedEntityState<ILevel>,
	LevelGetters
>;
type LevelStoreDefinition = OrganizationBasedEntityStoreDefinition<
	ILevel,
	'level',
	OrganizationBasedEntityState<ILevel>,
	LevelGetters
>;

const levelStore: PiniaStore<LevelStore> = {
	state: makeOrganizationBasedEntityState<ILevel>(levelService),
	getters: {
		...makeOrganizationBasedEntityGetters<ILevel>(),
		getNextHierarchyLevel(state) {
			const currentOrganization = useOrganizationStore().currentEntity;
			if (!currentOrganization) return 0;
			return state.entities.filter(
				({ organizationId }) => organizationId === currentOrganization.id
			).length;
		},
		isProjectLevel(state) {
			return (levelId: string) => {
				const projectLevel = useOrganizationStore().currentEntity?.useEpics
					? 1
					: 0;
				return (
					state.entities.find((level) => level.id === levelId)
						?.hierarchyLevel === projectLevel
				);
			};
		},
		getLowerLevel(state) {
			const currentLevel: Entity<OrganizationBasedEntity<ILevel>> =
				state.currentEntity;
			if (!currentLevel) return;

			return state.entities.find(
				(x) =>
					x.organizationId === currentLevel.organizationId &&
					x.hierarchyLevel === currentLevel.hierarchyLevel - 1
			);
		},
	},
	actions: makeOrganizationBasedEntityActions<ILevel>(),
};

export const useLevelStore: LevelStoreDefinition = defineStore(
	'level',
	levelStore
);
