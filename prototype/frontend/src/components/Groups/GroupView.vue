<template>
	<div class="flex items-center gap-10">
		<AppInlineInputField
			class="mr-5 my-2 text-4xl"
			v-model="currentGroup.name"
			type="text"
			name="name"
			id="name"
			placeholder="Group-Name"
			label="Group-Name"
			@save="groupStore.updateEntity(currentGroup.id, currentGroup)" />
		<AppProgressBar class="flex-grow" :progress="metrics.progress"
			>Progress</AppProgressBar
		>
		<AppToolTip text="Delete Group" position="left">
			<AppIcon @click="deleteGroupModal?.open()">delete</AppIcon>
		</AppToolTip>
	</div>
	<div class="h-100 flex gap-20">
		<TasksDoughnutChart name="Group" :tasks="tasks"></TasksDoughnutChart>
		<div class="flex justify-center items-center text-xl text-left">
			<div
				class="flex flex-col justify-center gap-2 text-left bg-gray-200 dark:bg-dark-500 p-5 rounded-l-md">
				<span> total Tasks: </span>
				<span> total open Tasks: </span>
				<span class="text-blue-800"> total in Progress Tasks: </span>
				<span class="text-successGreen"> total done Tasks: </span>
			</div>
			<div
				class="flex flex-col justify-center gap-2 text-left pl-10 p-5 bg-gray-200 dark:bg-dark-500 rounded-r-md">
				<span> {{ metrics.totalLength }} </span>
				<span> {{ metrics.openLength }} </span>
				<span class="text-blue-800"> {{ metrics.inProgressLength }} </span>
				<span class="text-successGreen"> {{ metrics.inProgressLength }} </span>
			</div>
		</div>
	</div>
	<div>
		<div class="text-2xl text-left my-10">linked Groups:</div>
		<div class="flex flex-wrap gap-5">
			<TransitionGroup>
				<GroupCard
					class="flex-grow"
					v-for="group of groupStore.getEntitiesLinkedToEntityGroupId(
						currentGroup.id
					)"
					:group="group"
					:key="group.id"
					@click="goToGroupDetails(group)"></GroupCard>
			</TransitionGroup>
		</div>
	</div>
	<AppYesNoModal ref="deleteGroupModal" @yes="deleteCurrentGroup()">
		Delete this Group?
	</AppYesNoModal>
</template>
<script lang="ts" setup>
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { useTaskStore } from '@/store/tasks.store';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const deleteGroupModal = modalRef();
const router = useRouter();

const groupStore = useGroupStore();
const taskStore = useTaskStore();
const levelStore = useLevelStore();
const currentGroup = computed(() => groupStore.currentEntity!);

const deleteCurrentGroup = () => {
	groupStore.deleteEntity(currentGroup.value);
	router.push({ name: 'LevelView' });
};

const goToGroupDetails = (group: EntityGroup) => {
	router.push({
		name: levelStore.isProjectLevel(group.levelId)
			? 'ProjectDashboard'
			: 'GroupView',
		params: { levelId: group.levelId, groupId: group.id },
	});
};

const tasks = computed(() =>
	taskStore.getTasksLinkedToEntityGroupIdRecursive(currentGroup.value.id)
);

const metrics = taskStore.computeMetrics(tasks);
</script>
