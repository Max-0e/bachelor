import { ITask } from '@/intefaces/task.interface';
import { taskService } from '@/services/task.service';

import { defineEntityStore, getEntityStateDefaults } from './entity.store';

const makeTaskGetters = () => ({});

const makeTaskActions = () => ({});

export const useTaskStore = defineEntityStore<
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
