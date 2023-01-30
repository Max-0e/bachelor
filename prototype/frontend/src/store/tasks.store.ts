import { ITask } from '@/intefaces/task.interface';
import { taskService } from '@/services/task.service';

import { getEntityStateDefaults } from './entity.store';
import { defineLinkableEntityStore } from './linkable-entity.store';

const makeTaskGetters = () => ({});

const makeTaskActions = () => ({});

export const useTaskStore = defineLinkableEntityStore<
	ITask,
	ReturnType<typeof makeTaskGetters>,
	ReturnType<typeof makeTaskActions>
>(
	'task',
	taskService,
	getEntityStateDefaults(),
	makeTaskGetters(),
	makeTaskActions()
);
