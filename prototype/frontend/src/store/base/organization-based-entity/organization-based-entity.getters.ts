import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { useRouter } from 'vue-router';
import { isState } from '../entity/entity.store';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { OrganizationBasedEntityState } from './organization-based-entity.state';
import { OrganizationBasedEntityStore } from './organization-based-entity.store';

export interface OrganizationBasedEntityGetters<T> extends PiniaGetterTree {
	currentEntity(): Entity<OrganizationBasedEntity<T>> | undefined;
	currentEntitiesFromOrganization(): Entity<OrganizationBasedEntity<T>>[];
}

export const makeOrganizationBasedEntityGetters = <T>() => {
	const getters: PiniaGetters<OrganizationBasedEntityStore<T>> = {
		currentEntity(state) {
			if (!isState<OrganizationBasedEntityState<T>>(state)) return;
			const currentEntityId =
				useRouter().currentRoute.value.params[this.$id + 'Id'];
			return state.entities.find((entity) => entity.id === currentEntityId);
		},
		currentEntitiesFromOrganization(state) {
			if (!isState<OrganizationBasedEntityState<T>>(state)) return [];
			const currentOrganizationId =
				useRouter().currentRoute.value.params['organizationId'];
			return state.entities.filter(
				(entity) => entity.organizationId === currentOrganizationId
			);
		},
	};
	return getters;
};
