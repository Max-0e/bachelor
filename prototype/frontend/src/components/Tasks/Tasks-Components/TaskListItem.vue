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
			<AppDropDownMenu
				v-model="task.status"
				selectText="select Status"
				@update:model-value="projectStore.updateTask(project, task)"
				:defaultValueName="Status[task.status]"
				:options="[
					{ name: Status[Status.open], value: Status.open },
					{ name: Status[Status.inProgress], value: Status.inProgress },
					{ name: Status[Status.done], value: Status.done },
				]"></AppDropDownMenu>
		</span>
		<span class="w-1/3 px-5">
			<div class="float-right">
				<AppToolTip text="delete Task" position="left">
					<AppIcon class="px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400" @click="deleteModal!.open()"
						>delete</AppIcon
					>
				</AppToolTip>
			</div>
		</span>
	</div>
	<AppYesNoModal
		ref="deleteModal"
		@yes="
			projectStore.deleteTask(project, task);
			deleteModal!.close();
		">
		Delete Project "{{ task.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import AppInlineInputField from '@/components/shared/Input/AppInlineInputField.vue';
import AppDropDownMenu from '@/components/shared/Input/AppDropDownMenu.vue';
import AppYesNoModal from '@/components/shared/Modal/AppYesNoModal.vue';
import AppIcon from '@/components/shared/UI/AppIcon.vue';
import AppToolTip from '@/components/shared/UI/AppToolTip.vue';

import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import { ITask, Status } from '@/intefaces/task.interface';
import { IProject } from '@/intefaces/project.interface';

const projectStore = useProjectStore();
const deleteModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);

defineProps({
	task: { type: Object as PropType<ITask>, required: true },
	project: { type: Object as PropType<IProject>, required: true },
});
</script>
