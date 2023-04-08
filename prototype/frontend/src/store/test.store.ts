import { IOrganization } from '@/interfaces/organization.interface';
import { organizationService } from '@/services/organization.service';
import { defineStore } from 'pinia';
import { makeEntityActions } from './base/entity/entity.actions';
import { makeEntityGetters } from './base/entity/entity.getters';
import { makeEntityState } from './base/entity/entity.state';

export const useOrganizationStoreAlternative = defineStore('test', {
	state: makeEntityState<IOrganization>(organizationService),
	getters: makeEntityGetters<IOrganization>(),
	actions: makeEntityActions<IOrganization>(),
});
