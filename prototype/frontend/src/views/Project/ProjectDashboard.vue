<template>
	<div v-if="!!currentProject">
		<div class="flex justify-between m-5">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mr-5 mt-2 mb-5"
					v-model="currentProject.name"
					type="text"
					name="name"
					id="name"
					placeholder="Project-Name"
					label="Project-Name"
					@save="
						groupStore.updateEntity(currentProject!.id, currentProject!)
					" />
			</div>
			<AppToolTip text="Delete Project" position="left">
				<AppIcon button @click="deleteProjectModal?.open()">delete</AppIcon>
			</AppToolTip>
		</div>
		<div class="h-100 flex gap-20">
			<AppInlineTextArea
				v-model="currentProject.description"
				placeholder="Description"
				label="Description"
				@save="groupStore.updateEntity(currentProject!.id, currentProject!)" />
			<TasksDoughnutChart name="Group" :tasks="tasks"></TasksDoughnutChart>
			<div class="flex justify-center items-center text-xl text-left">
				<div
					class="flex whitespace-nowrap flex-col justify-center gap-2 text-left bg-gray-200 dark:bg-dark-500 p-5 rounded-l-md">
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
					<span class="text-successGreen">
						{{ metrics.inProgressLength }}
					</span>
				</div>
			</div>
		</div>
		<div class="p-5">
			<AlternativeTaskList />
		</div>
		<div class="p-5">
			<AppCollapsible triggerText="Backlog">
				<TaskList />
			</AppCollapsible>
		</div>
	</div>
	<div v-else>Something went Wrong...</div>
	<AppYesNoModal ref="deleteProjectModal" @yes="deleteCurrentProject()">
		Delete this Project?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useTaskStore } from '@/store/tasks.store';

const groupStore = useGroupStore();
const taskStore = useTaskStore();
const router = useRouter();

const currentProject = ref(groupStore.currentEntity);
const deleteProjectModal = modalRef();

const tasks = computed(() =>
	taskStore.getEntitiesLinkedToEntityGroupId(currentProject.value!.id)
);

function deleteCurrentProject() {
	groupStore.deleteEntity(currentProject.value!);
	router.push({ name: 'Projects' });
}

const metrics = taskStore.computeMetrics(tasks);
</script>
