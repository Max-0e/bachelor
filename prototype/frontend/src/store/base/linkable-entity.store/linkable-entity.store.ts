import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import {
	OrganizationBasedEntityStore,
	OrganizationBasedEntityStoreDefinition,
} from '../organization-based-entity/organization-based-entity.store';
import { LinkableEntityGetters } from './linkable-entity.getters';
import { LinkableEntityState } from './linkable-entity.state';

export type LinkableEntityStore<
	T,
	Id extends string = string,
	TLinkableEntityGetters extends LinkableEntityGetters<T> = LinkableEntityGetters<T>
> = OrganizationBasedEntityStore<
	LinkableEntity<T>,
	Id,
	LinkableEntityState<T>,
	TLinkableEntityGetters
>;

export type LinkableEntityStoreDefinition<
	T,
	Id extends string = string,
	TLinkableEntityGetters extends LinkableEntityGetters<T> = LinkableEntityGetters<T>
> = OrganizationBasedEntityStoreDefinition<
	LinkableEntity<T>,
	Id,
	LinkableEntityState<T>,
	TLinkableEntityGetters
>;
