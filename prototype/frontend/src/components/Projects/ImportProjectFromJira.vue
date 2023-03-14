<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col">
			<AppInputField
				ref="name"
				placeholder="name"
				label="name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<div v-for="project in jiraStore.projects">
				{{ project.name }}
			</div>
			<AppButton @click="submit()"
				>Create {{ levelStore.currentEntity?.name }}</AppButton
			>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useJiraStore } from '@/store/jira.store';
import { useLevelStore } from '@/store/level.store';

import { FormGroup } from '../shared/Input/formGroup';

const groupStore = useGroupStore();
const levelStore = useLevelStore();
const jiraStore = useJiraStore();

const modal = modalRef();

const open = () => modal.value?.open();

const name = inputRef();
const formGroup = new FormGroup({ name });

jiraStore.loadProjects();

const submit = () => {
	if (!formGroup.validate()) return;

	const currentLevel = levelStore.currentEntity;
	if (!currentLevel) return;

	groupStore.createEntity({
		name: formGroup.formObjects.name.value,
		levelId: currentLevel.id,
		entityGroupIds: [],
	});

	modal.value?.close();
};

defineExpose({ open });
</script>
