<template>
	<div v-if="!!currentObjective">
		<div class="flex justify-between m-5">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mx-5 mt-2 mb-5 p-5"
					v-model="currentObjective.name"
					type="text"
					name="name"
					id="name"
					placeholder="Initiative-Name"
					label="Initiative-Name"
					@save="updateObjective()" />
			</div>
			<div>
				<AppButton
					:color="'red'"
					:iconButton="true"
					tooltip="delete objective"
					tooltipPosition="left"
					@click="deleteModal!.open()">
					delete
				</AppButton>
			</div>
		</div>
		<div class="text-xl p-10 m-5 border border-gray-300 dark:border-dark-50 rounded-lg">
			<div>
				<!-- Average Initiative Progress: <span class="text-blue-400">{{ metrics.averageInitiativeProgress }}%</span> -->
			</div>
			<div>
				<!-- Total Progress: <span class="text-blue-400">{{ metrics.totalProgress }}%</span> -->
			</div>
		</div>
		<AppYesNoModal
			@yes="
				objectiveStore.deleteCurrentObjective();
				deleteModal!.close();
			">
			Delete Objective "{{ currentObjective.name }}"?
		</AppYesNoModal>
		<div class="text-left ml-10 mt-10 text-xl font-bold">Initiatives</div>
		<div class="flex flex-wrap gap-10 p-5 m-5 border border-gray-300 dark:border-dark-50 rounded-lg">
			<div class="flex-grow flex" v-for="initiative in initiativeStore.getInitiativesFromCurrentObjective">
				<InitiativeCard
					class="cursor-pointer w-9/10"
					:initiative="initiative"
					@click="router.push('/app/initiatives/' + initiative.id)" />
				<div class="w-1/10 px-2">
					<div
						class="cursor-pointer w-full h-full flex justify-center shadow-md items-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-dark-400 dark:hover:bg-dark-600"
						@click="removeInitiativeModal!.open()">
						<AppIcon>more_vert</AppIcon>
					</div>
				</div>
				<AppYesNoModal
					@yes="
						objectiveStore.removeInitiativeFromCurrentObjective(initiative);
						removeInitiativeModal!.close();
					"
					@cancel="removeInitiativeModal!.close()">
					Remove Initiative "{{ initiative.name }}" fom Objective "{{ currentObjective.name }}"?
				</AppYesNoModal>
			</div>
		</div>

		<AppFloatingActionButton @click="addInitiativeToObjectiveModal!.open()" :icon="true"
			>add</AppFloatingActionButton
		>
		<AppModal>
			<div class="font-bold text-xl w-full text-left">Add Initiative to Objective</div>
			<div class="w-full">
				<form>
					<div>
						<AppDropDownMenu
						v-model="selectedInitiative"
						selectText="select Initiative"
						:options="
							initiativeStore.initiatives
							.filter((initiativeFromState) => !initiativeStore.getInitiativesFromCurrentObjective.includes(initiativeFromState))
							.map(initiative => ({name: initiative.name, value: initiative}))
						"
						/>
					</div>
				</form>
			</div>
			<div class="w-full flex justify-end gap-5">
				<AppButton color="red" @click="addInitiativeToObjectiveModal!.close()">Cancel</AppButton>
				<AppButton @click="addInitiativeToObjective()">Add</AppButton>
			</div>
		</AppModal>
	</div>
	<div v-else>Something went wrong ...</div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useInitiativeStore } from '@/store/initiatives';
import { ref } from 'vue';

import InitiativeCard from '@/components/Initiatives/Initiatives-Components/InitiativeCard.vue';
import AppModal from '@/components/shared/Modal/AppModal.vue';
import AppDropDownMenu from '@/components/shared/Input/AppDropDownMenu.vue';
import AppYesNoModal from '@/components/shared/Modal/AppYesNoModal.vue';
import AppButton from '@/components/shared/Input/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/UI/AppFloatingActionButton.vue';
import AppInlineInputField from '@/components/shared/Input/AppInlineInputField.vue';
import { useObjectiveStore } from '@/store/objectives';
import AppIcon from '../shared/UI/AppIcon.vue';

const initiativeStore = useInitiativeStore();
const objectiveStore = useObjectiveStore();

const addInitiativeToObjectiveModal = ref<InstanceType<typeof AppModal> | null>(null);
const removeInitiativeModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);
const deleteModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);

const selectedInitiative = ref(null);

const currentObjective = ref(objectiveStore.getCurrentObjective);

// const metrics = ref(useObjectiveStore().getMetrics(initiativeStore.getInitiativesFromCurrentObjective));

function updateObjective() {
	if (!!currentObjective.value) objectiveStore.updateObjective(currentObjective.value);
}

function addInitiativeToObjective() {
	if (!!currentObjective.value && !!selectedInitiative.value) {
		objectiveStore.addInitiativeToObjective(currentObjective.value, selectedInitiative.value);
		addInitiativeToObjectiveModal.value!.close();
	} else {
		// TODO do some stuff here;
	}
}
</script>
