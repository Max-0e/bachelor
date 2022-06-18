<template>
	<div class="flex flex-wrap gap-10">
		<ObjectiveCard
			class="cursor-pointer flex-grow"
			v-for="objective in objectiveStore.objectives"
			:objective="objective"
			@click="router.push('/app/objectives/' + objective.id)">
		</ObjectiveCard>
	</div>
	<AppFloatingActionButton @click="createObjectiveModal?.open()" :icon="true">add</AppFloatingActionButton>
	<AppModal ref="createObjectiveModal">
		<div class="font-bold text-xl w-full text-left">Create new Objective</div>
		<div class="w-full">
			<form
			@keydown.enter="
				objectiveStore.createObjective(objectiveToCreate);
				objectiveToCreate.name = '';
				createObjectiveModal?.close();
			">
				<div>
					<AppInputField
						v-model="objectiveToCreate.name"
						type="text"
						name="name"
						id="name"
						placeholder="Objective-Name"
						label="Objective-Name" />
				</div>
			</form>
		</div>
		<div class="w-full flex justify-end gap-5">
			<AppButton color="red" @click="createObjectiveModal?.close()">Cancel</AppButton>
			<AppButton
				@click="
					objectiveStore.createObjective(objectiveToCreate);
					objectiveToCreate.name = '';
					createObjectiveModal?.close();
				"
				>Create</AppButton
			>
		</div>
	</AppModal>
</template>
<script setup lang="ts">
import AppModal from '@/components/shared/Modal/AppModal.vue';
import AppButton from '@/components/shared/Input/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/UI/AppFloatingActionButton.vue';
import AppInputField from '@/components/shared/Input/AppInputField.vue';

import router from '@/router';

import { useObjectiveStore } from '@/store/objectives';
import { Ref, ref } from 'vue';
import { ICreateObjective } from '@/intefaces/objective.interface';
import ObjectiveCard from './Objectives-Components/ObjectiveCard.vue';

const createObjectiveModal = ref<InstanceType<typeof AppModal> | null>(null);;

const objectiveToCreate: Ref<ICreateObjective> = ref({ name: '' });

const objectiveStore = useObjectiveStore();
</script>
