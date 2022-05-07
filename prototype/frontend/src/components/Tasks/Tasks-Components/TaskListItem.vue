<template>
	<div class="border border-dark-100 w-full rounded-md flex justify-between items-center p-1 m-1">
		<span class="w-1/3 text-left px-5">
			<AppInlineInputField
				v-model="task.name"
				type="text"
				name="name"
				id="name"
				placeholder="Task-Name"
				label="Task-Name"
				:with-label="false"
				@save="projectStore.updateTask(project, task)" />
		</span>
		<span class="w-1/3 text-left px-5">
			<input
				type="checkbox"
				:checked="task.done"
				@change="
					task.done = !task.done;
					projectStore.updateTask(project, task);
				" />
		</span>
		<span class="w-1/3 px-5">
			<AppIcon @click="deleteModalOpen = true;" class="px-2 m-1 float-right">delete</AppIcon>
		</span>
	</div>
	<AppYesNoModal
		:open="deleteModalOpen"
		@yes="
			projectStore.deleteTask(project, task);
			deleteModalOpen = false;
		"
		@cancel="deleteModalOpen = false">
		Delete Project "{{ task.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import AppInlineInputField from '../../shared/AppInlineInputField.vue';
import AppYesNoModal from '../../shared/AppYesNoModal.vue';
import AppIcon from '../../shared/AppIcon.vue';

import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import { ITask } from '@/intefaces/task.interface';
import { IProject } from '@/intefaces/project.interface';

const projectStore = useProjectStore();
const deleteModalOpen = ref(false);

defineProps({
	task: { type: Object as PropType<ITask>, required: true },
	project: { type: Object as PropType<IProject>, required: true },
});
</script>
