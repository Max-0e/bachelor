import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { router } from '@/router';
import { useRouter } from 'vue-router';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { OrganizationBasedEntityStore } from './organization-based-entity.store';

export interface OrganizationBasedEntityGetters<T> extends PiniaGetterTree {
	currentEntity(): Entity<OrganizationBasedEntity<T>> | undefined;
	currentEntitiesFromOrganization(): Entity<OrganizationBasedEntity<T>>[];
}

export const makeOrganizationBasedEntityGetters = <T>() => {
	// TODO: fix types
	// for some reason not using an absolute type breaks the state-parameter from the the PiniaGetters-type
	// that is injected into the getter functions resulting in a heavily complex union type
	// @ts-ignore
	const getters: PiniaGetters<OrganizationBasedEntityStore<T>> = {
		currentEntity(state) {
			const currentEntityId = router.currentRoute.value.params[this.$id + 'Id'];
			return (state.entities as Entity<OrganizationBasedEntity<T>>[]).find(
				(entity) => entity.id === currentEntityId
			);
		},
		currentEntitiesFromOrganization(state) {
			const router = useRouter();
			const currentOrganizationId =
				router.currentRoute.value.params['organizationId'];
			return (state.entities as Entity<OrganizationBasedEntity<T>>[]).filter(
				(entity) => entity.organizationId === currentOrganizationId
			);
		},
	};
	return getters;
};
