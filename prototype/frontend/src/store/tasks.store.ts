import { ITask, Task } from '@/intefaces/task.interface';
import { taskService } from '@/services/task.service';
import { computed, Ref } from 'vue';

import { defineLinkableEntityStore } from './linkable-entity.store';
import { getOrganizationBasedEntityStateDefaults } from './organization-based-entity.store';

const makeTaskGetters = () => ({
	computeMetrics() {
		return (tasks: Ref<Task[]>) =>
			computed(() => {
				const refTasks = tasks.value;
				const totalLength = refTasks.length;
				const openLength = refTasks.filter(
					({ status }) => status === 'open'
				).length;
				const inProgressLength = refTasks.filter(
					({ status }) => status === 'inProgress'
				).length;
				const doneLength = refTasks.filter(
					({ status }) => status === 'done'
				).length;

				return {
					tasks,
					totalLength,
					openLength,
					inProgressLength,
					doneLength,
					progress: Math.floor((doneLength / totalLength) * 100),
				};
			});
	},
});

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
