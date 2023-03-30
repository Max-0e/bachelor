<template>
	<!-- Table Header -->
	<div class="w-full flex p-5 m-2 p-1 m-1">
		<span class="w-1/4">
			<b
				@click="
					sortingFn = sortByString<Task>('name');
					sortedBy = 'name';
				"
				class="flex items-center justify-center cursor-pointer"
				:class="{
					'text-blue-600': sortedBy === 'name',
				}">
				<AppIcon>sort</AppIcon>Name
			</b>
		</span>
		<span class="w-1/4">
			<b
				@click="
					sortingFn = sortByString<Task>('status');
					sortedBy = 'status';
				"
				class="flex items-center justify-center cursor-pointer"
				:class="{
					'text-blue-600': sortedBy === 'status',
				}">
				<AppIcon>sort</AppIcon>Status
			</b>
		</span>
		<span class="w-1/8">
			<b
				@click="
					sortingFn = sortByNumber<Task>('storyPoints');
					sortedBy = 'storyPoints';
				"
				class="flex items-center justify-center cursor-pointer"
				:class="{
					'text-blue-600': sortedBy === 'storyPoints',
				}">
				<AppIcon>sort</AppIcon>Story Points
			</b>
		</span>
		<span class="w-1/8">
			<b
				@click="
					sortingFn = sortByNumber<Task>('value');
					sortedBy = 'value';
				"
				class="flex items-center justify-center cursor-pointer"
				:class="{
					'text-blue-600': sortedBy === 'value',
				}">
				<AppIcon>sort</AppIcon>Value
			</b>
		</span>
		<span class="w-1/8">
			<b class="flex h-full items-center justify-center">Epic</b>
		</span>
		<span class="w-1/8 text-right pr-6">
			<b class="flex h-full items-center justify-center">Actions</b>
		</span>
	</div>
	<!-- Task List -->
	<TransitionGroup>
		<div
			class="flex items-center"
			v-for="task in tasks.sort(sortingFn)"
			:key="task.id">
			<TaskListItem :task="task" />
			<AppToolTip text="remove from epic" position="left" v-if="!!epic">
				<AppIcon class="text-red-600" button @click="removeFromEpic(task)"
					>remove_circle_outline</AppIcon
				>
			</AppToolTip>
		</div>
	</TransitionGroup>
	<!-- Add Task Field -->
	<div class="flex items-center">
		<div
			class="border dark:border-dark-800 w-full rounded-md flex justify-between items-center p-1 m-1"
			v-if="createNewTask">
			<span class="w-1/4 text-left items-center pt-3">
				<AppInputField
					ref="name"
					placeholder="name"
					id="name"
					:validation-types="[validationType.required, validationType.name]">
				</AppInputField>
			</span>
			<span class="w-1/4 text-left px-5">
				<AppDropDownMenu
					v-model="status"
					selectText="select Status"
					:options="options"></AppDropDownMenu>
			</span>
			<span class="w-1/8 text-left px-5 flex justify-evenly items-center">
				<AppToolTip position="top" text="Story Points">
					<AppIcon>token</AppIcon>
				</AppToolTip>
				<AppNumberInput
					:min-number="1"
					:value="storyPoints"
					@change="storyPoints = $event" />
			</span>
			<span class="w-1/8 text-left px-5 flex justify-evenly items-center">
				<AppToolTip position="top" text="value">
					<AppIcon>diamond</AppIcon>
				</AppToolTip>
				<AppNumberInput
					:min-number="1"
					:value="value"
					@change="value = $event" />
			</span>
			<span class="w-1/8">
				<AppDropDownMenu
					v-if="!epic"
					v-model="selectedEpicId"
					selectText="select Epic"
					ref="epicDropdown"
					:options="
						availableEpics.map((epic) => ({ name: epic.name, value: epic.id }))
					"></AppDropDownMenu>
			</span>
			<span class="w-1/8 px-5">
				<AppIcon
					button
					class="px-2 m-1 float-right text-red-600"
					@click="setDefaults()"
					>clear</AppIcon
				>
				<AppIcon
					button
					class="px-2 m-1 text-successGreen float-right"
					@click="createTask()"
					>done</AppIcon
				>
			</span>
		</div>
		<div
			class="border dark:border-dark-800 w-full rounded-md flex justify-around items-center p-1 m-1"
			v-else>
			<AppToolTip text="create new Task">
				<AppIcon button @click="createNewTask = true"> add </AppIcon>
			</AppToolTip>
		</div>
	</div>
</template>

<script setup lang="ts">
import { validationType } from '@/enums/validationType.enum';
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { inputRef } from '@/interfaces/form.interface';
import { Status, Task } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { sortByNumber, sortByString } from '@/utility/sort';
import { computed, PropType, ref } from 'vue';
import { FormGroup } from '../shared/Input/formGroup';

const options = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const taskStore = useTaskStore();
const groupStore = useGroupStore();

const sortingFn = ref();
const sortedBy = ref('');

const currentProject = ref(groupStore.currentEntity);
const props = defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: false },
});

const createNewTask = ref(false);

const tasks = computed(() => {
	const groupId = props.epic?.id ?? currentProject.value!.id;
	return taskStore.getEntitiesLinkedToEntityGroupId(groupId);
});

const status = ref<Status>('open');
const storyPoints = ref<number>(1);
const value = ref<number>(1);
const selectedEpicId = ref<string>('');
const name = inputRef();
const formGroup = new FormGroup({ name });

const availableEpics = computed(() =>
	groupStore.downwardsLinkedGroupsForCurrentGroup.filter((x) => !!x?.levelId)
);

function createTask() {
	if (!formGroup.validate()) return;

	const entityGroupIds = [currentProject.value!.id];
	if (!!props.epic) entityGroupIds.push(props.epic.id);
	if (!!selectedEpicId.value) entityGroupIds.push(selectedEpicId.value);

	taskStore.createEntity({
		entityGroupIds,
		storyPoints: storyPoints.value,
		value: value.value,
		name: formGroup.formObjects.name.value,
		status: status.value,
		description: '',
	});

	setDefaults();
}

function removeFromEpic(task: Task) {
	const epic = props.epic;
	if (!epic) return;
	task.entityGroupIds.splice(
		task.entityGroupIds.findIndex((id) => id === epic.id),
		1
	);
	taskStore.updateEntity(task.id, task);
}

function setDefaults() {
	status.value = 'open';
	name.value?.patchValue('');
	createNewTask.value = false;
	storyPoints.value = 1;
	value.value = 1;
	selectedEpicId.value = '';
}
</script>
