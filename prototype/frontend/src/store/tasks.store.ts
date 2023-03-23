import { Entity } from '@/interfaces/entity.interface';
import { LinkableEntity } from '@/interfaces/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/organization-based-entity.interface';
import { ITask, Task } from '@/interfaces/task.interface';
import { taskService } from '@/services/task.service';
import { unique } from '@/utility/unique';
import { computed, Ref } from 'vue';
import { useAppStore } from './app';
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
				const totalStoryPoints = refTasks.reduce(
					(partialSum, task) => partialSum + task.storyPoints,
					0
				);

				const openTasks = refTasks.filter(({ status }) => status === 'open');
				const openLength = openTasks.length;
				const openStoryPoints = openTasks.reduce(
					(partialSum, task) => partialSum + task.storyPoints,
					0
				);

				const inProgressTasks = refTasks.filter(
					({ status }) => status === 'inProgress'
				);
				const inProgressLength = inProgressTasks.length;
				const inProgressStoryPoints = inProgressTasks.reduce(
					(partialSum, task) => partialSum + task.storyPoints,
					0
				);

				const doneTasks = refTasks.filter(({ status }) => status === 'done');
				const doneLength = doneTasks.length;
				const doneStoryPoints = doneTasks.reduce(
					(partialSum, task) => partialSum + task.storyPoints,
					0
				);

				const progress = Math.floor((doneLength / totalLength) * 100);
				const relativeProgress = Math.floor(
					(doneStoryPoints / totalStoryPoints) * 100
				);

				return {
					tasks,
					totalLength,
					totalStoryPoints,
					openLength,
					openStoryPoints,
					inProgressLength,
					inProgressStoryPoints,
					doneLength,
					doneStoryPoints,
					progress: useAppStore().relativeProgress
						? relativeProgress
						: progress,
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
