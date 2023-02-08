import { useGroupStore } from '@/store/entity-groups.store';
import { makeOrganizationBasedEntityResolver } from './organization-based-entity.resolver';

export const groupsResolver =
	makeOrganizationBasedEntityResolver(useGroupStore);
