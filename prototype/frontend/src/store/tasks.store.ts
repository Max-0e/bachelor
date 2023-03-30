import { Entity } from '@/interfaces/base/entity.interface';
import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { ITask, Task } from '@/interfaces/task.interface';
import { taskService } from '@/services/task.service';
import { unique } from '@/utility/unique';
import { computed, Ref } from 'vue';
import { useAppStore } from './app';
import { useGroupStore } from './entity-groups.store';

import {
	defineLinkableEntityStore,
	LinkableEntityStore,
} from './base/linkable-entity.store';
import { getOrganizationBasedEntityStateDefaults } from './base/organization-based-entity.store';

const makeTaskGetters = () => ({
	computeMetrics() {
		return (tasks: Ref<Task[]>) =>
			computed(() => {
				const refTasks = tasks.value;
				const totalLength = refTasks.length;
				const totalStoryPoints = sumByProperty(refTasks, 'storyPoints');
				const totalValue = sumByProperty(refTasks, 'value');

				const openTasks = refTasks.filter(({ status }) => status === 'open');
				const openLength = openTasks.length;
				const openStoryPoints = sumByProperty(openTasks, 'storyPoints');
				const openValue = sumByProperty(openTasks, 'value');

				const inProgressTasks = refTasks.filter(
					({ status }) => status === 'inProgress'
				);
				const inProgressLength = inProgressTasks.length;
				const inProgressStoryPoints = sumByProperty(
					inProgressTasks,
					'storyPoints'
				);
				const inProgressValue = sumByProperty(inProgressTasks, 'value');

				const doneTasks = refTasks.filter(({ status }) => status === 'done');
				const doneLength = doneTasks.length;
				const doneStoryPoints = sumByProperty(doneTasks, 'storyPoints');
				const doneValue = sumByProperty(doneTasks, 'value');

				const progress = Math.floor((doneLength / totalLength) * 100);
				const storyPointProgress = Math.floor(
					(doneStoryPoints / totalStoryPoints) * 100
				);
				const valueProgress = Math.floor((doneValue / totalValue) * 100);

				return {
					tasks,
					totalLength,
					totalStoryPoints,
					totalValue,
					openLength,
					openStoryPoints,
					openValue,
					inProgressLength,
					inProgressStoryPoints,
					inProgressValue,
					doneLength,
					doneStoryPoints,
					doneValue,
					progress:
						useAppStore().progressType === 'absolute'
							? progress
							: useAppStore().progressType === 'storyPoints'
							? storyPointProgress
							: valueProgress,
				};
			});
	},
	getTasksLinkedToEntityGroupIdRecursive(this: TaskStore) {
		return (entityGroupId: string) => {
			const groupsFromLevelBelow =
				useGroupStore().getEntitiesLinkedToEntityGroupId(entityGroupId);
			const tasks = this.getEntitiesLinkedToEntityGroupId(entityGroupId);
			if (groupsFromLevelBelow.length > 0) {
				return tasks
					.concat(
						groupsFromLevelBelow.flatMap(({ id }) =>
							this.getTasksLinkedToEntityGroupIdRecursive(id)
						)
					)
					.filter(unique) as Task[];
			} else {
				return tasks as Task[];
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

export type TaskStore = LinkableEntityStore<
	ITask,
	{
		computeMetrics: (
			entityGroupId: string
		) => Entity<OrganizationBasedEntity<LinkableEntity<ITask>>>[];
		getTasksLinkedToEntityGroupIdRecursive: (
			entityGroupId: string
		) => Entity<OrganizationBasedEntity<LinkableEntity<ITask>>>[];
	},
	{}
>;

const sumByProperty = <T>(tasks: T[], property: keyof T) =>
	tasks.reduce(
		(partialSum, task) => partialSum + (task[property] as number),
		0
	);
