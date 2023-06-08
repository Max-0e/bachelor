<template>
	<AppModal ref="modal" :dismissible="false">
		<div class="flex w-[100vw] flex-col gap-10">
			<div class="text-3xl">Import project from Jira</div>
			<AppStepper :step="currentStepperStep" :number-of-steps="3" minHeight>
				<AppStepperStep
					class="relative"
					:step="1"
					:current-step="currentStepperStep">
					<div
						class="z-100 dark:bg-dark-600 absolute flex h-full w-full cursor-not-allowed items-center justify-center bg-gray-300 opacity-80"
						v-if="!jiraStore.isLoaded">
						<span class="text-3xl text-red-700 !opacity-100">
							import not available
						</span>
					</div>
					<div class="flex flex-col gap-5">
						<div class="text-left text-xl">Choose your project</div>
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
									class="dark:bg-dark-700 m-2 flex items-center gap-2 rounded-md bg-gray-200 p-2"
									v-for="issueType in projectDetails.issueTypes.filter(
										(type) => type.hierarchyLevel === 0
									)">
									<img class="max-w-4" :src="issueType.iconUrl" />{{
										issueType.name
									}}
								</div>
							</div>
							<div v-if="organizationStore.currentEntity?.useEpics">
								<div class="text-xl">found Epic-Level Issue-Types</div>
								<div
									class="dark:bg-dark-700 m-2 flex items-center gap-2 rounded-md bg-gray-200 p-2"
									v-for="issueType in projectDetails.issueTypes.filter(
										(type) => type.hierarchyLevel === 1
									)">
									<img class="max-w-4" :src="issueType.iconUrl" />{{
										issueType.name
									}}
								</div>
							</div>
						</div>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="2" :current-step="currentStepperStep">
					<div v-if="!loadingData">
						<div class="text-left text-xl">Map your statuses</div>
						<div class="mb-20 flex flex-col gap-2">
							<div
								class="m-2 flex items-center justify-between gap-10 rounded-md p-2 px-10"
								:class="{
									'text-white bg-successGreen dark:bg-successGreenDark':
										status.prototypeStatus === 'done',
									'text-white bg-blue-400 dark:bg-blue-800':
										status.prototypeStatus === 'inProgress',
									'text-gray-600 dark:text-white bg-gray-200 dark:bg-dark-200':
										status.prototypeStatus === 'open',
								}"
								v-for="status in usedIssuesStatuses">
								{{ status.name }}
								<AppDropDownMenu
									class="w-100 text-gray-600 dark:text-white"
									v-model="status.prototypeStatus"
									:defaultValueName="status.prototypeStatus"
									selectText="select Status"
									:options="statusOptions"></AppDropDownMenu>
							</div>
						</div>
						<div class="text-left text-xl">
							Map Story Points and Value Fields
						</div>
						<div class="flex justify-center gap-5">
							<DropZone
								class="!dark:bg-dark-300 flex h-48 w-48 flex-col items-center justify-center !bg-gray-200"
								@on-drop="storyPointFieldId = $event">
								<AppIcon>token</AppIcon>
								Story Points
								<div
									v-if="storyPointFieldId"
									class="dark:bg-dark-600 rounded-md bg-gray-200 p-2">
									{{
										customFields.find((field) => field.id === storyPointFieldId)
											?.name
									}}
								</div>
							</DropZone>
							<DropZone
								class="!dark:bg-dark-300 flex h-48 w-48 flex-col items-center justify-center !bg-gray-200"
								@on-drop="valueFieldId = $event">
								<AppIcon>diamond</AppIcon>
								Value
								<div
									v-if="valueFieldId"
									class="dark:bg-dark-600 rounded-md bg-gray-200 p-2">
									{{
										customFields.find((field) => field.id === valueFieldId)
											?.name
									}}
								</div>
							</DropZone>
						</div>
						<div class="flex flex-wrap gap-2 p-5">
							<DraggableItem
								v-for="field in customFields.filter(
									(x) =>
										x.schema?.type === 'number' &&
										x.id !== storyPointFieldId &&
										x.id !== valueFieldId
								)"
								:data="field.id">
								<div class="dark:bg-dark-600 rounded-md bg-gray-200 p-2">
									{{ field.name }}
								</div>
							</DraggableItem>
						</div>
					</div>
					<div v-else>
						<div
							class="dark:bg-dark-600 h-10 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
						<div class="mb-20 flex flex-col gap-2">
							<div
								class="bg-gray-300 dark:bg-dark-200 m-2 flex animate-pulse items-center justify-between gap-10 rounded-md p-2 px-10">
								<div
									class="dark:bg-dark-600 h-10 w-1/4 rounded-md bg-gray-200"></div>
								<div
									class="dark:bg-dark-600 h-12 w-1/2 rounded-md bg-gray-200"></div>
							</div>
							<div
								class="m-2 flex animate-pulse items-center justify-between gap-10 rounded-md bg-blue-400 dark:bg-blue-800 p-2 px-10">
								<div
									class="dark:bg-dark-600 h-10 w-1/4 rounded-md bg-gray-200"></div>
								<div
									class="dark:bg-dark-600 h-12 w-1/2 rounded-md bg-gray-200"></div>
							</div>
							<div
								class="bg-successGreen dark:bg-successGreenDark m-2 flex animate-pulse items-center justify-between gap-10 rounded-md p-2 px-10">
								<div
									class="dark:bg-dark-600 h-10 w-1/4 rounded-md bg-gray-200"></div>
								<div
									class="dark:bg-dark-600 h-12 w-1/2 rounded-md bg-gray-200"></div>
							</div>
						</div>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="3" :current-step="currentStepperStep">
					<div v-if="!importingData">
						<div v-if="organizationStore.currentEntity?.useEpics">
							<div class="text-xl font-bold italic">Issues with epic</div>
							<div class="my-2 flex flex-wrap justify-center gap-2">
								<span
									class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
									v-for="issue of issues
										.filter(
											(issue) =>
												!!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										)
										.slice(0, 20)">
									<img :src="issue.fields.issuetype.iconUrl" />{{ issue.key }}
									{{ issue.fields.summary }}
								</span>
								<span
									v-if="
										issues.filter(
											(issue) =>
												!!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										).length > 20
									"
									class="flex items-center gap-1 rounded-md bg-successGreen dark:bg-successGreenDark px-1">
									+
									{{
										issues.filter(
											(issue) =>
												!!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										).length - 20
									}}
									additional issues
								</span>
							</div>
							<div class="text-xl font-bold italic">Issues without Epics</div>
							<div class="my-2 flex flex-wrap justify-center gap-2">
								<span
									class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
									v-for="issue of issues
										.filter(
											(issue) =>
												!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										)
										.slice(0, 20)">
									<img :src="issue.fields.issuetype.iconUrl" />{{ issue.key }}
									{{ issue.fields.summary }}
								</span>
								<span
									v-if="
										issues.filter(
											(issue) =>
												!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										).length > 20
									"
									class="flex items-center gap-1 rounded-md bg-successGreen dark:bg-successGreenDark px-1">
									+
									{{
										issues.filter(
											(issue) =>
												!issue.fields.parent &&
												issue.fields.issuetype.hierarchyLevel === 0
										).length - 20
									}}
									additional issues
								</span>
							</div>
							<div class="text-xl font-bold italic">Epics</div>
							<div class="my-2 flex flex-wrap justify-center gap-2">
								<span
									class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
									v-for="issue of issues
										.filter(
											(issue) => issue.fields.issuetype.hierarchyLevel === 1
										)
										.slice(0, 20)">
									<img :src="issue.fields.issuetype.iconUrl" />{{ issue.key }}
									{{ issue.fields.summary }}
								</span>
								<span
									v-if="
										issues.filter(
											(issue) => issue.fields.issuetype.hierarchyLevel === 1
										).length > 20
									"
									class="flex items-center gap-1 rounded-md bg-successGreen dark:bg-successGreenDark px-1">
									+
									{{
										issues.filter(
											(issue) => issue.fields.issuetype.hierarchyLevel === 1
										).length - 20
									}}
									additional issues
								</span>
							</div>
						</div>
						<div v-else>
							<div class="text-xl font-bold italic">Issues</div>
							<div class="my-2 flex flex-wrap justify-center gap-2">
								<span
									class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
									v-for="issue of issues.filter(
										(issue) => issue.fields.issuetype.hierarchyLevel === 0
									)">
									<img :src="issue.fields.issuetype.iconUrl" />{{ issue.key }}
									{{ issue.fields.summary }}
								</span>
							</div>
						</div>
					</div>
					<div v-else>
						<AppIcon class="m-auto animate-spin">sync</AppIcon>
					</div>
				</AppStepperStep>
			</AppStepper>
			<AppStepper :step="currentStepperStep" :number-of-steps="3">
				<AppStepperStep :step="1" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton color="red" @click="close()">cancel</AppButton>
						<AppButton
							:disabled="!selectedProject"
							@click="
								currentStepperStep += 1;
								loadRelatedData(selectedProject!);
							"
							>next Step</AppButton
						>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="2" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton @click="currentStepperStep -= 1">back</AppButton>
						<AppButton :disabled="loadingData" @click="currentStepperStep += 1"
							>next Step</AppButton
						>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="3" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton @click="currentStepperStep -= 1">back</AppButton>
						<AppButton @click="submit()">Import Project</AppButton>
					</div>
				</AppStepperStep>
			</AppStepper>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { JiraIssueField } from '@/interfaces/jira/jira-issue-field';
import { JiraIssueStatus } from '@/interfaces/jira/jira-issue-status.interface';
import { JiraIssue } from '@/interfaces/jira/jira-issue.interface';
import {
	JiraProject,
	JiraProjectDetails,
} from '@/interfaces/jira/jira-project.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { Status } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useJiraStore } from '@/store/jira.store';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { useTaskStore } from '@/store/tasks.store';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const statusOptions = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const organizationStore = useOrganizationStore();
const taskStore = useTaskStore();
const groupStore = useGroupStore();
const levelStore = useLevelStore();
const jiraStore = useJiraStore();

const router = useRouter();

const modal = modalRef();

const selectedProject = ref<JiraProject | undefined>();

const currentStepperStep = ref(1);
const loadingData = ref(false);
const importingData = ref(false);

const projectDetails = ref<JiraProjectDetails | undefined>(undefined);
const issues = ref<JiraIssue[]>([]);
const usedIssuesStatuses = ref<
	(JiraIssueStatus & { prototypeStatus: Status })[]
>([]);
const customFields = ref<JiraIssueField[]>([]);
const storyPointFieldId = ref('');
const valueFieldId = ref('');

watch(selectedProject, async (project) => {
	if (project) {
		projectDetails.value = await jiraStore.loadProjectDetails(project);
	}
});

const loadRelatedData = async (project: JiraProject) => {
	loadingData.value = true;
	issues.value = await jiraStore.loadProjectIssues(project);
	usedIssuesStatuses.value = (await jiraStore.loadProjectIssueStatuses(project))
		.filter((status) =>
			issues.value.some((issue) => issue.fields.status.id === status.id)
		)
		.map((x) => {
			const prototypeStatus: Status =
				x.statusCategory === 'TODO'
					? 'open'
					: x.statusCategory === 'IN_PROGRESS'
					? 'inProgress'
					: 'done';
			return { ...x, prototypeStatus };
		});

	customFields.value = await jiraStore.loadIssueCustomFields();
	loadingData.value = false;
};

const open = () => modal.value?.open();
const close = () => modal.value?.close();

const submit = async () => {
	const useEpics = !!organizationStore.currentEntity?.useEpics;
	importingData.value = true;
	const currentLevel = levelStore.currentEntity;
	const epicLevel = levelStore.getLowerLevel;
	const projectName = selectedProject.value?.name;
	if (!currentLevel || !projectName) return;

	const project = await groupStore.createEntity({
		name: projectName,
		levelId: currentLevel.id,
		entityGroupIds: [],
		description: '',
	});

	if (!project) return;

	const epics =
		useEpics && !!epicLevel
			? await groupStore.createMultipleEntities(
					issues.value
						.filter((issue) => issue.fields.issuetype.hierarchyLevel === 1)
						.map((epic) => ({
							name: epic.fields.summary,
							levelId: epicLevel.id,
							entityGroupIds: [project.id],
							description: '',
						}))
			  )
			: [];

	if (!epics) return;
	const mappedEpics = epics.map((epic) => ({
		...epic,
		epicKey: issues.value.find((issue) => issue.fields.summary === epic.name)
			?.key,
	}));

	const tasks = await taskStore.createMultipleEntities(
		issues.value
			.filter((issue) => issue.fields.issuetype.hierarchyLevel === 0)
			.map((task) => {
				const entityGroupIds = [project.id];
				if (!!task.fields.parent) {
					const epicId = mappedEpics.find(
						(epic) => epic.epicKey === task.fields.parent.key
					)?.id;
					entityGroupIds.push(epicId!);
				}
				const status = usedIssuesStatuses.value.find(
					(status) => status.id === task.fields.status.id
				)!.prototypeStatus;
				return {
					name: task.fields.summary,
					// the task.fields.description contains weird JSON-Data that is nowhere to be explained in the JIRA-docs
					// due to this a description-import is not supported
					description: '',
					storyPoints: task.fields[storyPointFieldId.value] ?? 1,
					value: task.fields[valueFieldId.value] ?? 1,
					status,
					entityGroupIds,
				};
			})
	);
	if (!tasks) return;

	importingData.value = false;
	useToast().success(
		`Successfully imported Project ${projectName} with ${epics.length} epics and ${tasks.length} Tasks.`
	);
	router.push({
		name: 'ProjectDashboard',
		params: { groupId: project.id },
	});
};

defineExpose({ open });
</script>
