import { useTaskStore } from '@/store/tasks.store';
import { makeOrganizationBasedEntityResolver } from './organization-based-entity.resolver';

export const tasksResolver = makeOrganizationBasedEntityResolver(useTaskStore);
