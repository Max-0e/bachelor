import { ITask, Task } from '@/interfaces/task.interface';
import { unique } from '@/utility/unique';
import { ComputedRef, Ref, computed } from 'vue';
import { useAppStore } from './app';
import { useGroupStore } from './entity-groups.store';

import { taskService } from '@/services/task.service';
import { defineStore } from 'pinia';
import { makeLinkableEntityActions } from './base/linkable-entity.store/linkable-entity.actions';
import {
	LinkableEntityGetters,
	makeLinkableEntityGetters,
} from './base/linkable-entity.store/linkable-entity.getters';
import { makeLinkableEntityState } from './base/linkable-entity.store/linkable-entity.state';
import {
	LinkableEntityStore,
	LinkableEntityStoreDefinition,
} from './base/linkable-entity.store/linkable-entity.store';
import { PiniaStore } from './base/piniaTypes';

interface TaskGetters extends LinkableEntityGetters<ITask> {
	computeMetrics(): (tasks: Ref<Task[]>) => ComputedRef<TaskMetrics>;
	getTasksLinkedToEntityGroupIdRecursive(): (entityGroupId: string) => Task[];
}

type TaskStore = LinkableEntityStore<ITask, 'task', TaskGetters>;
type TaskStoreDefinition = LinkableEntityStoreDefinition<
	ITask,
	'task',
	TaskGetters
>;

const taskStore: PiniaStore<TaskStore> = {
	state: makeLinkableEntityState<ITask>(taskService),
	getters: {
		...makeLinkableEntityGetters<ITask>(),
		computeMetrics() {
			return (tasks: Ref<Task[]>) =>
				computed((): TaskMetrics => {
					const refTasks = tasks.value;
					const openTasks = refTasks.filter(({ status }) => status === 'open');
					const inProgressTasks = refTasks.filter(
						({ status }) => status === 'inProgress'
					);
					const doneTasks = refTasks.filter(({ status }) => status === 'done');

					return {
						tasks,
						totalLength: refTasks.length,
						totalStoryPoints: sumByProperty(refTasks, 'storyPoints'),
						totalValue: sumByProperty(refTasks, 'value'),
						openLength: openTasks.length,
						openStoryPoints: sumByProperty(openTasks, 'storyPoints'),
						openValue: sumByProperty(openTasks, 'value'),
						inProgressLength: inProgressTasks.length,
						inProgressStoryPoints: sumByProperty(
							inProgressTasks,
							'storyPoints'
						),
						inProgressValue: sumByProperty(inProgressTasks, 'value'),
						doneLength: doneTasks.length,
						doneStoryPoints: sumByProperty(doneTasks, 'storyPoints'),
						doneValue: sumByProperty(doneTasks, 'value'),
						get progress() {
							switch (useAppStore().progressType) {
								case 'absolute':
									return Math.floor((this.doneLength / this.totalLength) * 100);
								case 'storyPoints':
									return Math.floor(
										(this.doneStoryPoints / this.totalStoryPoints) * 100
									);
								case 'value':
									return Math.floor((this.doneValue / this.totalValue) * 100);
							}
						},
					};
				});
		},
		getTasksLinkedToEntityGroupIdRecursive(_state) {
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
						.filter(unique);
				} else {
					return tasks;
				}
			};
		},
	},
	actions: makeLinkableEntityActions<ITask>(),
};

export const useTaskStore: TaskStoreDefinition = defineStore('task', taskStore);

const sumByProperty = <T>(tasks: T[], property: keyof T) => {
	return tasks.reduce(
		(partialSum, task) => partialSum + (task[property] as number),
		0
	);
};

export type TaskMetrics = {
	tasks: Ref<Task[]>;
	totalLength: number;
	totalStoryPoints: number;
	totalValue: number;
	openLength: number;
	openStoryPoints: number;
	openValue: number;
	inProgressLength: number;
	inProgressStoryPoints: number;
	inProgressValue: number;
	doneLength: number;
	doneStoryPoints: number;
	doneValue: number;
	progress: number;
};
