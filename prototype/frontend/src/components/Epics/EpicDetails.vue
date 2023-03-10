<template>
	<div class="flex w-screen flex-col gap-10">
		<AppInlineInputField
			class="mr-5 mt-2 mb-5 text-3xl"
			v-model="epic.name"
			type="text"
			name="name"
			id="name"
			placeholder="Project-Name"
			label="Project-Name"
			@save="" />

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
				<AppButton :disabled="!selectedTask" @click="addTaskToEpic()"
					>Add to Epic</AppButton
				>
			</div>
			<TaskList :epic="epic" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { Task } from '@/interfaces/task.interface';
import { useTaskStore } from '@/store/tasks.store';

import { computed, PropType, Ref, ref } from 'vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';

const taskStore = useTaskStore();

const selectedTask: Ref<Task | null> = ref(null);

const tasks = computed(() =>
	taskStore.getEntitiesLinkedToEntityGroupId(props.project.id)
);
const dropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

const props = defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: true },
	project: { type: Object as PropType<EntityGroup>, required: true },
});

function addTaskToEpic() {
	const task = selectedTask.value;
	if (!task) return;
	task.entityGroupIds.push(props.epic.id);
	taskStore.updateEntity(task.id, task);
	selectedTask.value = null;
	dropdown.value!.reset();
}
</script>
