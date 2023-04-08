<template>
	<div v-if="!!currentProject">
		<div class="m-5 flex justify-between">
			<div class="w-1/2 text-2xl">
				<AppInlineInputField
					class="mb-5 mr-5 mt-2"
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
			<div class="flex items-center justify-center text-left text-xl">
				<div
					class="dark:bg-dark-500 flex flex-col justify-center gap-2 whitespace-nowrap rounded-l-md bg-gray-200 p-5 text-left">
					<span> total Tasks: </span>
					<span> total open Tasks: </span>
					<span class="text-blue-800"> total in Progress Tasks: </span>
					<span class="text-successGreen"> total done Tasks: </span>
				</div>
				<div
					class="dark:bg-dark-500 flex flex-col justify-center gap-2 rounded-r-md bg-gray-200 p-5 pl-10 text-left">
					<span> {{ metrics.totalLength }} </span>
					<span> {{ metrics.openLength }} </span>
					<span class="text-blue-800"> {{ metrics.inProgressLength }} </span>
					<span class="text-successGreen">
						{{ metrics.doneLength }}
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
