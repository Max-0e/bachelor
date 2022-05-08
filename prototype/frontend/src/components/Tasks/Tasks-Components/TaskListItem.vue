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
				class="cursor-pointer"
				:checked="task.done"
				@change="
					task.done = !task.done;
					projectStore.updateTask(project, task);
				" />
		</span>
		<span class="w-1/3 px-5">
			<div class="float-right">
				<AppToolTip text="delete Task" position="left">
					<AppIcon class="px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400" @click="deleteModalOpen = true"
						>delete</AppIcon
					>
				</AppToolTip>
			</div>
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
import AppInlineInputField from '@/components/shared/AppInlineInputField.vue';
import AppYesNoModal from '@/components/shared/AppYesNoModal.vue';
import AppIcon from '@/components/shared/AppIcon.vue';
import AppToolTip from '@/components/shared/AppToolTip.vue';

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
