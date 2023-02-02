import { IOrganization } from '@/intefaces/organization.interface';
import { organizationService } from '@/services/organization.service';
import { defineEntityStore, getEntityStateDefaults } from './entity.store';

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
