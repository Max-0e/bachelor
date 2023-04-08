import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { useRouter } from 'vue-router';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { OrganizationBasedEntityStore } from './organization-based-entity.store';

export interface OrganizationBasedEntityGetters<T> extends PiniaGetterTree {
	currentEntity(): Entity<OrganizationBasedEntity<T>> | undefined;
	currentEntitiesFromOrganization(): Entity<OrganizationBasedEntity<T>>[];
}

export const makeOrganizationBasedEntityGetters = <T>() => {
	// TODO: fix types
	//@ts-ignore
	const getters: PiniaGetters<OrganizationBasedEntityStore<T>> = {
		currentEntity(state) {
			const currentEntityId =
				useRouter().currentRoute.value.params[this.$id + 'Id'];
			return (state.entities as Entity<OrganizationBasedEntity<T>>[]).find(
				(entity) => entity.id === currentEntityId
			);
		},
		currentEntitiesFromOrganization(state) {
			const currentOrganizationId =
				useRouter().currentRoute.value.params['organizationId'];
			return (state.entities as Entity<OrganizationBasedEntity<T>>[]).filter(
				(entity) => entity.organizationId === currentOrganizationId
			);
		},
	};
	return getters;
};
