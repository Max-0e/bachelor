import { Entity } from '@/interfaces/base/entity.interface';
import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import {
	OrganizationBasedEntityGetters,
	makeOrganizationBasedEntityGetters,
} from '../organization-based-entity/organization-based-entity.getters';
import { PiniaGetters } from '../piniaTypes';
import { LinkableEntityStore } from './linkable-entity.store';

export interface LinkableEntityGetters<T>
	extends OrganizationBasedEntityGetters<LinkableEntity<T>> {
	getEntitiesLinkedToEntityGroupId(): (
		entityGroupId: string
	) => Entity<OrganizationBasedEntity<LinkableEntity<T>>>[];
}

export const makeLinkableEntityGetters = <T>() => {
	// TODO: fix types
	// for some reason not using an absolute type breaks the state-parameter from the the PiniaGetters-type
	// that is injected into the getter functions resulting in a heavily complex union type
	// @ts-ignore
	const getters: PiniaGetters<LinkableEntityStore<T>> = {
		getEntitiesLinkedToEntityGroupId(state) {
			return (entityGroupId: string) => {
				const entities = state.entities as Entity<
					OrganizationBasedEntity<LinkableEntity<T>>
				>[];
				return entities.filter(({ entityGroupIds }) =>
					entityGroupIds.includes(entityGroupId)
				);
			};
		},
		...makeOrganizationBasedEntityGetters<LinkableEntity<T>>(),
	};
	return getters;
};
