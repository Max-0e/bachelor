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
		<div>
			Tasks (done):
			{{
				taskStore
					.getEntitiesLinkedToEntityGroupId(currentProject.id)
					.filter(({ status }) => status === 'done').length
			}}<br />
			Progress: {{ metrics.progress }}%
		</div>
		<div class="w-1/4 m-auto">
			<TasksDoughnutChart :tasks="tasks" />
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
