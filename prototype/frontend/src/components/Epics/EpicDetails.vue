<template>
	<div class="flex w-screen flex-col gap-10">
		<div class="flex justify-between">
			<AppInlineInputField
				class="mr-5 mt-2 mb-5 text-3xl"
				v-model="epic.name"
				type="text"
				name="epicName"
				id="epicName"
				placeholder="Epic-Name"
				label="Epic-Name"
				@save="groupStore.updateEntity(epic.id, epic)" />
			<AppToolTip text="delete Epic" position="left">
				<AppIcon button @click="$emit('deleteEpic', epic)">delete</AppIcon>
			</AppToolTip>
		</div>
		<div class="h-48">
			<TasksDoughnutChart
				name="Epic"
				:tasks="
					tasks.filter((task) => task.entityGroupIds.includes(epic.id))
				" />
		</div>
		<div>
			<div class="flex gap-5">
				<AppDropDownMenu
					ref="dropdown"
					class="flex-grow"
					v-model="selectedTask"
					selectText="select Task to add"
					:options="
						tasks
							.filter((task) => !task.entityGroupIds.includes(epic.id))
							.map((task) => ({ name: task.name, value: task }))
					" />
				<AppToolTip
					:text="selectedTask ? '' : 'no Task selected'"
					position="top">
					<AppButton :disabled="!selectedTask" @click="addTaskToEpic()"
						>Add to Epic</AppButton
					>
				</AppToolTip>
			</div>
			<TaskList :epic="epic" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { Task } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';

import { computed, PropType, Ref, ref } from 'vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';

const taskStore = useTaskStore();
const groupStore = useGroupStore();

const selectedTask: Ref<Task | null> = ref(null);

const tasks = computed(() =>
	taskStore.getEntitiesLinkedToEntityGroupId(props.project.id)
);
const dropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

const props = defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: true },
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const addTaskToEpic = () => {
	const task = selectedTask.value;
	if (!task) return;
	task.entityGroupIds.push(props.epic.id);
	taskStore.updateEntity(task.id, task);
	selectedTask.value = null;
	dropdown.value!.reset();
};

defineEmits<{ (event: 'deleteEpic', epic: EntityGroup): void }>();
</script>
