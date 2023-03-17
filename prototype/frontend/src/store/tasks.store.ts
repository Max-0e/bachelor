import { ITask, Task } from '@/interfaces/task.interface';
import { taskService } from '@/services/task.service';
import { unique } from '@/utility/unique';
import { computed, Ref } from 'vue';
import { useGroupStore } from './entity-groups.store';

import {
	defineLinkableEntityStore,
	LinkableEntityStore,
} from './linkable-entity.store';
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
	getTasksLinkedToEntityGroupIdRecursive(this: LinkableEntityStore<ITask>) {
		return (entityGroupId: string) => {
			const groupsFromLevelBelow = computed(() =>
				useGroupStore().getEntitiesLinkedToEntityGroupId(entityGroupId)
			);
			const tasks = computed(() =>
				(this as any).getEntitiesLinkedToEntityGroupId(entityGroupId)
			);
			if (groupsFromLevelBelow.value.length > 0) {
				return tasks.value
					.concat(
						groupsFromLevelBelow.value.flatMap(({ id }) =>
							(this as any).getTasksLinkedToEntityGroupIdRecursive(id)
						)
					)
					.filter(unique) as Task[];
			} else {
				return tasks.value as Task[];
			}
		};
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
