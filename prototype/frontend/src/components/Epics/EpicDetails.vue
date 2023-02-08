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
			<!-- <div class="flex gap-5">
				<AppDropDownMenu
					ref="dropdown"
					class="flex-grow"
					v-model="selectedTask"
					selectText="select Task to add"
					:options="
						project.tasks
							.filter((task) => !task.epics?.includes(epic.id))
							.map((task) => ({ name: task.name, value: task }))
					" />
				<AppButton :disabled="!selectedTask" @click="addTaskToEpic()"
					>Add to Epic</AppButton
				>
			</div>
			<TaskList :project="project" :epic="epic" /> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/intefaces/entity-groups.interface';
import { PropType } from 'vue';

// const projectStore = useProjectStore();

// const selectedTask: Ref<ITask | null> = ref(null);

// const dropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: true },
});

// function addTaskToEpic() {
// 	if (!selectedTask.value) return;
// 	selectedTask.value?.epics.push(props.epic.id);
// 	projectStore.updateTask(props.project, selectedTask.value);
// 	selectedTask.value = null;
// 	dropdown.value!.reset();
// }
</script>
