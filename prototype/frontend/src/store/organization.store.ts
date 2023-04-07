import { IOrganization } from '@/interfaces/organization.interface';
import { organizationService } from '@/services/organization.service';
import { defineStore } from 'pinia';
import { makeEntityActions } from './base/entity/entity.actions';
import { makeEntityGetters } from './base/entity/entity.getters';
import { makeEntityState } from './base/entity/entity.state';
import { EntityStoreDefinition } from './base/entity/entity.store';

export const useOrganizationStore: EntityStoreDefinition<
	IOrganization,
	'organization'
> = defineStore('organization', {
	state: makeEntityState<IOrganization>(organizationService),
	getters: makeEntityGetters<IOrganization>(),
	actions: makeEntityActions<IOrganization>(),
});
