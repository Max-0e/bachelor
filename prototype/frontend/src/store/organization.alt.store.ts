import { Entity } from '@/interfaces/base/entity.interface';
import { IOrganization } from '@/interfaces/organization.interface';
import { PiniaCustomStateProperties, _GettersTree, defineStore } from 'pinia';
import { EntityGetters, makeEntityGetters } from './base/alternative.store';
import { EntityState } from './base/entity.store';

const getters = makeEntityGetters<IOrganization>('organization');

export const useAlternativeOrganizationStore = defineStore<
	'organization',
	EntityState<IOrganization>,
	_GettersTree<
		EntityState<IOrganization> &
			PiniaCustomStateProperties<EntityGetters<IOrganization>>
	>,
	{}
>('organization', {
	state: () => ({
		isLoaded: false as boolean,
		entities: [] as Entity<IOrganization>[],
	}),
	getters: getters,
	actions: {},
});

// export const useAlternativeOrganizationStore = defineStore('organization', {
// 	state: () => () => {},
// 	getters: {},
// 	actions: {},
// });
