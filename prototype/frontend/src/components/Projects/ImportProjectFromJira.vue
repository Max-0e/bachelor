<template>
	<AppModal ref="modal">
		<div class="flex flex-col gap-10 w-[100vw]">
			<div class="text-3xl">Import project from Jira</div>
			<div class="flex items-center gap-5">
				<img
					class="max-w-10"
					v-if="selectedProject"
					:src="selectedProject.avatarUrls['16x16']" />
				<AppDropDownMenu
					class="w-full"
					@update:model-value="selectedProject = $event"
					selectText="Select project to import"
					ref="epicDropdown"
					:options="
						jiraStore.projects.map((project) => ({
							name: project.name,
							value: project,
						}))
					"></AppDropDownMenu>
			</div>
			<div v-if="projectDetails" class="flex gap-10 text-left">
				<div>
					<div class="text-xl">found Task-Level Issue-Types</div>
					<div
						class="bg-gray-200 dark:bg-dark-700 p-2 rounded-md m-2 flex items-center gap-2"
						v-for="issueType in projectDetails.issueTypes.filter(
							(type) => type.hierarchyLevel === 0
						)">
						<img class="max-w-4" :src="issueType.iconUrl" />{{ issueType.name }}
					</div>
				</div>
				<div>
					<div class="text-xl">found Epic-Level Issue-Types</div>
					<div
						class="bg-gray-200 dark:bg-dark-700 p-2 rounded-md m-2 flex items-center gap-2"
						v-for="issueType in projectDetails.issueTypes.filter(
							(type) => type.hierarchyLevel === 1
						)">
						<img class="max-w-4" :src="issueType.iconUrl" />{{ issueType.name }}
					</div>
				</div>
			</div>
			<AppButton @click="submit()">Import Project</AppButton>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { JiraIssue } from '@/interfaces/jira-issue.interface';
import {
	JiraProject,
	JiraProjectDetails,
} from '@/interfaces/jira-project.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useJiraStore } from '@/store/jira.store';
import { ref, watch } from 'vue';

// const groupStore = useGroupStore();
// const levelStore = useLevelStore();
const jiraStore = useJiraStore();

const modal = modalRef();

const selectedProject = ref<JiraProject | undefined>();

const projectDetails = ref<JiraProjectDetails | undefined>(undefined);
const issues = ref<JiraIssue[] | undefined>(undefined);

watch(selectedProject, async (project) => {
	if (project) {
		projectDetails.value = await jiraStore.loadProjectDetails(project);
		issues.value = await jiraStore.loadProjectIssues(project);
	}
});

const open = () => modal.value?.open();

const submit = () => {
	// const currentLevel = levelStore.currentEntity;
	// if (!currentLevel) return;

	// groupStore.createEntity({
	// 	name: formGroup.formObjects.name.value,
	// 	levelId: currentLevel.id,
	// 	entityGroupIds: [],
	// });

	modal.value?.close();
};

defineExpose({ open });
</script>
