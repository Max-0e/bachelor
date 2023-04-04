import { Organization } from '@/interfaces/organization.interface';
import { defineStore } from 'pinia';
import { entityActions } from './entity.actions';
import { entityGetters } from './entity.getters';
import { entityState } from './entity.state';
import { EntityStoreDefinition } from './entity.store';

export const useOrganizationStore: EntityStoreDefinition<
	Organization,
	'organization'
> = defineStore('organization', {
	state: entityState,
	getters: entityGetters,
	actions: entityActions,
});
