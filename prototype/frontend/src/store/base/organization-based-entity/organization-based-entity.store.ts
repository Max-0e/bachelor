import { Store, StoreDefinition } from 'pinia';
import { OrganizationBasedEntityActions } from './organization-based-entity.action';
import { OrganizationBasedEntityGetters } from './organization-based-entity.getters';
import { OrganizationBasedEntityState } from './organization-based-entity.state';

export type OrganizationBasedEntityStore<
	T,
	Id extends string = string,
	TOrganizationBasedEntityState extends OrganizationBasedEntityState<T> = OrganizationBasedEntityState<T>,
	TOrganizationBasedEntityGetters extends OrganizationBasedEntityGetters<T> = OrganizationBasedEntityGetters<T>,
	TOrganizationBasedEntityActions extends OrganizationBasedEntityActions<T> = OrganizationBasedEntityActions<T>
> = Store<
	Id,
	TOrganizationBasedEntityState,
	TOrganizationBasedEntityGetters,
	TOrganizationBasedEntityActions
>;
export type OrganizationBasedEntityStoreDefinition<
	T,
	Id extends string = string,
	TOrganizationBasedEntityState extends OrganizationBasedEntityState<T> = OrganizationBasedEntityState<T>,
	TOrganizationBasedEntityGetters extends OrganizationBasedEntityGetters<T> = OrganizationBasedEntityGetters<T>,
	TOrganizationBasedEntityActions extends OrganizationBasedEntityActions<T> = OrganizationBasedEntityActions<T>
> = StoreDefinition<
	Id,
	TOrganizationBasedEntityState,
	TOrganizationBasedEntityGetters,
	TOrganizationBasedEntityActions
>;
