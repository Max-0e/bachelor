import { IOrganization } from '@/interfaces/organization.interface';
import { organizationService } from '@/services/organization.service';
import { defineEntityStore, getEntityStateDefaults } from './base/entity.store';

const makeOrganizationGetters = () => ({});

const makeOrganizationActions = () => ({});

export const useOrganizationStore = defineEntityStore<
	IOrganization,
	ReturnType<typeof makeOrganizationGetters>,
	ReturnType<typeof makeOrganizationActions>
>(
	'organization',
	organizationService,
	getEntityStateDefaults(),
	makeOrganizationGetters(),
	makeOrganizationActions()
);
