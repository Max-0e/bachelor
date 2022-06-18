<template>
	<div class="flex flex-wrap gap-10">
		<InitiativeCard
			class="cursor-pointer flex-grow"
			v-for="initiative in initiativeStore.initiatives"
			:initiative="initiative"
			@click="router.push('/app/initiatives/' + initiative.id)">
		</InitiativeCard>
	</div>
	<AppFloatingActionButton @click="createInitiativeModal!.open()" :icon="true">add</AppFloatingActionButton>
	<AppModal ref="createInitiativeModal">
		<div class="font-bold text-xl w-full text-left">Create new Initiative</div>
		<div class="w-full">
			<form
			@keydown.enter="
				initiativeStore.createInitiative(initiativeToCreate);
				initiativeToCreate.name = '';
				createInitiativeModal!.close()
			">
				<div>
					<AppInputField
						v-model="initiativeToCreate.name"
						type="text"
						name="name"
						id="name"
						placeholder="Initiative-Name"
						label="Initiative-Name" />
				</div>
			</form>
		</div>
		<div class="w-full flex justify-end gap-5">
			<AppButton color="red" @click="createInitiativeModal!.close()">Cancel</AppButton>
			<AppButton
				@click="
					initiativeStore.createInitiative(initiativeToCreate);
					initiativeToCreate.name = '';
					createInitiativeModal!.close()
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

import { useInitiativeStore } from '@/store/initiatives';
import { Ref, ref } from 'vue';
import { ICreateInitiative } from '@/intefaces/initiative.interface';
import InitiativeCard from './Initiatives-Components/InitiativeCard.vue';

const createInitiativeModal = ref<InstanceType<typeof AppModal> | null>(null);

const initiativeToCreate: Ref<ICreateInitiative> = ref({ name: '' });

const initiativeStore = useInitiativeStore();
</script>
