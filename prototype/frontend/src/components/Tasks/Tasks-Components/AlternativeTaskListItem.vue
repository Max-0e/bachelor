<template>
	<div
		class="w-full cursor-move rounded-md flex justify-between items-center p-1 m-1"
		:class="
			task.status === Status.done
				? 'bg-green-400 dark:bg-green-600'
				: task.status === Status.inProgress
				? 'bg-blue-400 dark:bg-blue-800'
				: 'bg-gray-400 dark:bg-dark-200'
		">
		<span class="w-1/2 text-left px-5">
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
		<span class="w-1/2 px-5">
			<div class="float-right">
				<AppToolTip text="delete Task" position="left">
					<AppIcon
						class="px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400"
						@click="$emit('onOpenDeleteTaskModal', task)"
						>delete</AppIcon
					>
				</AppToolTip>
			</div>
		</span>
	</div>
</template>
<script setup lang="ts">
import AppInlineInputField from '@/components/shared/Input/AppInlineInputField.vue';
import AppIcon from '@/components/shared/UI/AppIcon.vue';
import AppToolTip from '@/components/shared/UI/AppToolTip.vue';

import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import { ITask, Status } from '@/intefaces/task.interface';
import { IProject } from '@/intefaces/project.interface';

const projectStore = useProjectStore();

defineProps({
	task: { type: Object as PropType<ITask>, required: true },
	project: { type: Object as PropType<IProject>, required: true },
});

defineEmits(['onOpenDeleteTaskModal']);
</script>
