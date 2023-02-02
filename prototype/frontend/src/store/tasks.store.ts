import { ITask } from '@/intefaces/task.interface';
import { taskService } from '@/services/task.service';

import { defineLinkableEntityStore } from './linkable-entity.store';
import { getOrganizationBasedEntityStateDefaults } from './organization-based-entity.store';

const makeTaskGetters = () => ({});

const makeTaskActions = () => ({});

export const useTaskStore = defineLinkableEntityStore<
	ITask,
	ReturnType<typeof makeTaskGetters>,
	ReturnType<typeof makeTaskActions>
>(
	'task',
	taskService,
	getOrganizationBasedEntityStateDefaults(),
	makeTaskGetters(),
	makeTaskActions()
);
