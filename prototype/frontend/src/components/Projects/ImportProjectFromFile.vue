<template>
	<AppModal ref="modal" :dismissible="false">
		<div class="flex w-full flex-col gap-10">
			<div class="text-3xl">Import project from File</div>
			<AppStepper :step="currentStepperStep" :number-of-steps="4" minHeight>
				<AppStepperStep :step="1" :current-step="currentStepperStep">
					<AppInputField
						ref="name"
						placeholder="Project-Name"
						label="Project-Name"
						id="name"
						:validation-types="[validationType.required, validationType.name]">
					</AppInputField>
					<div
						class="bg-light-200 dark:bg-dark-200 hover:bg-light-400 dark:hover:bg-dark-400 relative mx-5 mt-10 flex h-40 items-center justify-center rounded-md transition-all">
						<input
							type="file"
							dropzone
							@drop="dropData($event)"
							class="absolute z-10 h-full w-full cursor-pointer opacity-0"
							@input="dropData($event)" />
						<div
							class="absolute"
							:class="{ 'text-successGreen': !!data.fileName }">
							<span>
								{{
									data.fileName
										? 'File ' + data.fileName + ' successfully uploaded'
										: 'drag or click to upload a file'
								}}</span
							>
							<AppIcon class="mx-auto">{{
								data.fileName ? 'file_download_done' : 'upload'
							}}</AppIcon>
						</div>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="2" :current-step="currentStepperStep">
					<div>
						<AppToggleInput
							label="first row are Headers"
							:initial-value="firstRowAreHeaders"
							@change="
								firstRowAreHeaders = !firstRowAreHeaders;
								extractData();
							">
						</AppToggleInput>
					</div>
					<div>
						Drag and Drop headers into and out of the table-headers to map.
					</div>
					<DropZone
						class="dark:bg-dark-300 m-5 flex items-center justify-center gap-2 bg-gray-200"
						@on-drop="droppedOutOfHeader($event)">
						<DraggableItem
							class="dark:bg-dark-700 rounded-md bg-gray-300 p-2 font-bold"
							v-for="header of taskHeaders.filter(
								(x) =>
									!data.headers.some(
										(header) =>
											header.name.toLowerCase() === x && header.isMapped
									)
							)"
							:data="header">
							{{ header }}
						</DraggableItem>
					</DropZone>
					<table class="mx-auto">
						<tr>
							<th
								class="border"
								:class="{ 'border-successGreen': header.isMapped }"
								v-for="(header, index) in data.headers">
								<DropZone @on-drop="droppedOnHeader($event, index)">
									<DraggableItem
										class="dark:bg-dark-700 rounded-md bg-gray-300 p-2"
										:data="header.name"
										v-if="header.isMapped">
										{{ header.name }}
									</DraggableItem>
									<span class="p-2" v-else>
										{{ header.name }}
									</span>
								</DropZone>
							</th>
						</tr>
						<tr v-for="dataRow of data.extractedData">
							<td class="border p-2" v-for="header of data.headers">
								{{ dataRow[header.key as keyof typeof dataRow] }}
							</td>
						</tr>
					</table>
				</AppStepperStep>
				<AppStepperStep :step="3" :current-step="currentStepperStep">
					<div class="text-left text-xl">Map your statuses</div>
					<div class="mb-20 flex flex-col gap-2">
						<div
							class="m-2 flex items-center justify-between gap-10 rounded-md p-2 px-10"
							:class="{
								'bg-successGreen': status.prototypeStatus === 'done',
								'bg-blue-800': status.prototypeStatus === 'inProgress',
								'bg-dark-200': status.prototypeStatus === 'open',
							}"
							v-for="status in data.taskStatuses">
							<span class="text-white">
								{{ status.name }}
							</span>
							<AppDropDownMenu
								class="w-100"
								v-model="status.prototypeStatus"
								:defaultValueName="status.prototypeStatus"
								selectText="select Status"
								:options="statusOptions"></AppDropDownMenu>
						</div>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="4" :current-step="currentStepperStep">
					<div v-if="!importingData">
						<div class="text-xl font-bold italic">Tasks</div>
						<div class="my-2 flex flex-wrap justify-center gap-2">
							<span
								class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
								v-for="task of data.extractedData">
								{{ getDataByHeaderName(task, 'name') }}
							</span>
						</div>
						<div
							v-if="organizationStore.currentEntity?.useEpics"
							class="text-xl font-bold italic">
							Epics
						</div>
						<div
							v-if="organizationStore.currentEntity?.useEpics"
							class="my-2 flex flex-wrap justify-center gap-2">
							<span
								class="dark:bg-dark-700 flex items-center gap-1 rounded-md bg-gray-200 px-1"
								v-for="epic of getEpics(data.extractedData)">
								{{ epic }}
							</span>
						</div>
					</div>
					<div v-else>
						<AppIcon class="m-auto animate-spin">sync</AppIcon>
					</div>
				</AppStepperStep>
			</AppStepper>
			<AppStepper :step="currentStepperStep" :number-of-steps="4">
				<AppStepperStep :step="1" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton color="red" @click="close()">cancel</AppButton>
						<AppButton
							:disabled="
								formGroup.formObjects.name.value === '' || !data.fileName
							"
							@click="
								currentStepperStep += 1;
								extractData();
							"
							>next Step</AppButton
						>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="2" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton @click="currentStepperStep -= 1">back</AppButton>
						<AppButton
							:disabled="
								data.headers.filter((x) => x.isMapped).length !==
								taskHeaders.length
							"
							@click="
								currentStepperStep += 1;
								extractStatuses();
							"
							>next Step</AppButton
						>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="3" :current-step="currentStepperStep">
					<div class="flex justify-between">
						<AppButton @click="currentStepperStep -= 1">back</AppButton>
						<AppButton @click="currentStepperStep += 1">next Step</AppButton>
					</div>
				</AppStepperStep>
				<AppStepperStep :step="4" :current-step="currentStepperStep">
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
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { Status } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { useTaskStore } from '@/store/tasks.store';
import { unique } from '@/utility/unique';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Sheet2JSONOpts, WorkSheet, read, utils } from 'xlsx';
import { FormGroup } from '../shared/Input/formGroup';

const statusOptions = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const organizationStore = useOrganizationStore();
const taskStore = useTaskStore();
const groupStore = useGroupStore();
const levelStore = useLevelStore();

const taskHeaders = ['name', 'description', 'status', 'storypoints', 'value'];

if (organizationStore.currentEntity?.useEpics) {
	taskHeaders.push('epic');
}
const router = useRouter();

const data: Ref<{
	fileName: string;
	ws?: WorkSheet;
	headers: { name: string; key: string; isMapped: boolean }[];
	extractedData: object[];
	taskStatuses: { name: string; prototypeStatus: Status }[];
}> = ref({
	fileName: '',
	headers: [],
	extractedData: [],
	taskStatuses: [],
});

const modal = modalRef();
const name = inputRef();
const formGroup = new FormGroup({ name });

const currentStepperStep = ref(1);
const firstRowAreHeaders = ref(true);
const importingData = ref(false);

const dropData = async (e: Event) => {
	const files = (e.target as HTMLInputElement).files;
	if (!files || files.length === 0) return;
	const file = files[0];

	if (!file.name.includes('.xlsx') && !file.name.includes('.csv')) {
		useToast().error('unsupported filetype');
		return;
	}

	const rawData = await file.arrayBuffer();
	const wb = read(rawData);
	data.value.ws = wb.Sheets[wb.SheetNames[0]];
	data.value.fileName = file.name;
};

const extractData = () => {
	if (!data.value.ws) return;
	const options: Sheet2JSONOpts = {};
	if (!firstRowAreHeaders.value) {
		options.header = 'A';
	}
	data.value.extractedData = utils.sheet_to_json(data.value.ws, options);
	// find the object in the data array with the most keys and assume these are the headers
	const numberOfKeys = data.value.extractedData.map(
		(object) => Object.keys(object).length
	);
	const maxValue = Math.max(...numberOfKeys);
	data.value.headers = Object.keys(
		data.value.extractedData[numberOfKeys.indexOf(maxValue)]
	).map((header) => ({
		name: header,
		key: header,
		isMapped: taskHeaders.some(
			(taskHeader) => header.toLowerCase() === taskHeader
		),
	}));
};

const droppedOnHeader = (name: string, index: number) => {
	if (
		data.value.headers.some((header) => header.name === name && header.isMapped)
	) {
		droppedOutOfHeader(name);
	}
	data.value.headers[index].name = name;
	data.value.headers[index].isMapped = true;
};

const droppedOutOfHeader = (name: string) => {
	const index = data.value.headers.findIndex(
		(header) => header.name === name && header.isMapped
	);
	if (index === -1) return;
	data.value.headers[index].name = data.value.headers[index].key;
	data.value.headers[index].isMapped = false;
};

const extractStatuses = () => {
	data.value.taskStatuses = data.value.extractedData
		.map<string>((x) => getDataByHeaderName(x, 'status'))
		.filter(unique)
		.map((x) => ({
			name: x,
			prototypeStatus: 'open' as Status,
		}));
};

const getEpics = (tasks: object[]) =>
	tasks
		.map<string>((x) => getDataByHeaderName(x, 'epic'))
		.filter((x) => !!x)
		.filter(unique);

const getDataByHeaderName = (x: any, key: string): string => {
	const headerKey = getHeaderKeyFor<typeof x>(key);
	if (!headerKey) return '';
	return x[headerKey];
};

function getHeaderKeyFor<T>(name: string): keyof T | undefined {
	return data.value.headers.find((header) => header.name.toLowerCase() === name)
		?.key as keyof T;
}

const open = () => modal.value?.open();
const close = () => {
	data.value = {
		fileName: '',
		headers: [],
		extractedData: [],
		taskStatuses: [],
	};
	modal.value?.close();
};

const submit = async () => {
	importingData.value = true;
	const useEpics = !!organizationStore.currentEntity?.useEpics;
	const currentLevel = levelStore.currentEntity;
	const epicLevel = levelStore.getLowerLevel;
	const projectName = formGroup.formObjects.name.value;
	if (!currentLevel || !projectName) return;
	const project = await groupStore.createEntity({
		name: projectName,
		levelId: currentLevel.id,
		entityGroupIds: [],
		description: '',
	});
	if (!project) return;
	const epics =
		useEpics && epicLevel
			? await groupStore.createMultipleEntities(
					getEpics(data.value.extractedData).map((epic) => ({
						name: epic,
						levelId: epicLevel.id,
						entityGroupIds: [project.id],
						description: '',
					}))
			  )
			: [];
	if (!epics) return;
	console.log(epics);
	const tasks = await taskStore.createMultipleEntities(
		data.value.extractedData.map((task) => {
			const entityGroupIds = [project.id];
			const epicFromTask = getDataByHeaderName(task, 'epic');
			if (!!epicFromTask) {
				const epicId = epics.find((epic) => epic.name === epicFromTask)?.id;
				entityGroupIds.push(epicId!);
			}
			const status =
				data.value.taskStatuses.find(
					(status) => status.name === getDataByHeaderName(task, 'status')
				)?.prototypeStatus ?? 'open';

			const storyPoints = parseInt(getDataByHeaderName(task, 'storypoints'));
			const value = parseInt(getDataByHeaderName(task, 'value'));
			return {
				name: getDataByHeaderName(task, 'name'),
				description: getDataByHeaderName(task, 'description'),
				storyPoints: typeof storyPoints === 'number' ? storyPoints : 1,
				value: typeof value === 'number' ? value : 1,
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
