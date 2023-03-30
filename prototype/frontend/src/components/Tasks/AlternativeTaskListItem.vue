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
		<div class="text-left p-3 w-1/2 truncate">
			{{ task.name }}
		</div>
		<AppToolTip text="story points" position="top">
			<span class="flex items-center">
				<AppIcon>token</AppIcon>
				{{ task.storyPoints }}
			</span>
		</AppToolTip>
		<AppToolTip text="value" position="top">
			<span class="flex items-center">
				<AppIcon>diamond</AppIcon>
				{{ task.value }}
			</span>
		</AppToolTip>
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
