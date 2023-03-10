<template>
	<div
		class="w-full text-white cursor-move rounded-md flex justify-between items-center p-1 m-1"
		:class="
			task.status === 'done'
				? 'bg-successGreen dark:bg-successGreen'
				: task.status === 'inProgress'
				? 'bg-blue-800 dark:bg-blue-800'
				: 'bg-dark-200 dark:bg-dark-200'
		">
		<span class="flex-grow text-left p-5">
			{{ task.name }}
			<!-- <AppInlineInputField
				v-model="task.name"
				type="text"
				name="name"
				id="name"
				placeholder="Task-Name"
				label="Task-Name"
				:with-label="false"
				@save="taskStore.updateEntity(task.id, task)" /> -->
		</span>
		<span>
			<div class="float-right">
				<AppToolTip text="delete Task" position="left">
					<AppIcon button @click.stop="$emit('onOpenDeleteTaskModal', task)"
						>delete</AppIcon
					>
				</AppToolTip>
			</div>
		</span>
	</div>
</template>
<script setup lang="ts">
import { Task } from '@/interfaces/task.interface';
import { PropType } from 'vue';

defineProps({
	task: { type: Object as PropType<Task>, required: true },
});

defineEmits(['onOpenDeleteTaskModal']);
</script>
