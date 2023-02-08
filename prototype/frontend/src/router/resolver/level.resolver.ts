import { useLevelStore } from '@/store/level.store';
import { makeOrganizationBasedEntityResolver } from './organization-based-entity.resolver';
export const levelsResolver =
	makeOrganizationBasedEntityResolver(useLevelStore);
