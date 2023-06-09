import { Entity } from '@/interfaces/base/entity.interface';
import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { isState } from '../entity/entity.store';
import {
	OrganizationBasedEntityGetters,
	makeOrganizationBasedEntityGetters,
} from '../organization-based-entity/organization-based-entity.getters';
import { PiniaGetters } from '../piniaTypes';
import { LinkableEntityState } from './linkable-entity.state';
import { LinkableEntityStore } from './linkable-entity.store';

export interface LinkableEntityGetters<T>
	extends OrganizationBasedEntityGetters<LinkableEntity<T>> {
	getEntitiesLinkedToEntityGroupId(): (
		entityGroupId: string
	) => Entity<OrganizationBasedEntity<LinkableEntity<T>>>[];
}

export const makeLinkableEntityGetters = <T>() => {
	const getters: PiniaGetters<LinkableEntityStore<T>> = {
		getEntitiesLinkedToEntityGroupId(state) {
			return (entityGroupId: string) => {
				if (!isState<LinkableEntityState<T>>(state)) return [];
				return state.entities.filter(({ entityGroupIds }) =>
					entityGroupIds.includes(entityGroupId)
				);
			};
		},
		...makeOrganizationBasedEntityGetters<LinkableEntity<T>>(),
	};
	return getters;
};
