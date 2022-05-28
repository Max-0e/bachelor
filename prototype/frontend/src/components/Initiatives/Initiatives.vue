<template>
	<div class="flex flex-wrap gap-10">
		<InitiativeCard
			class="cursor-pointer flex-grow"
			v-for="initiative in initiativeStore.initiatives"
			:initiative="initiative"
			@click="router.push('/app/initiatives/' + initiative.id)">
		</InitiativeCard>
	</div>
	<AppFloatingActionButton @click="showCreateInitiativeModal = true" :icon="true">add</AppFloatingActionButton>
	<AppModal :open="showCreateInitiativeModal">
		<div class="font-bold text-xl w-full text-left">Create new Initiative</div>
		<div class="w-full">
			<form
			@keydown.enter="
				initiativeStore.createInitiative(initiativeToCreate);
				initiativeToCreate.name = '';
				showCreateInitiativeModal = false;
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
			<AppButton color="red" @click="showCreateInitiativeModal = false">Cancel</AppButton>
			<AppButton
				@click="
					initiativeStore.createInitiative(initiativeToCreate);
					initiativeToCreate.name = '';
					showCreateInitiativeModal = false;
				"
				>Create</AppButton
			>
		</div>
	</AppModal>
</template>
<script setup lang="ts">
import AppModal from '@/components/shared/AppModal.vue';
import AppButton from '@/components/shared/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/AppFloatingActionButton.vue';
import AppInputField from '@/components/shared/AppInputField.vue';

import router from '@/router';

import { useInitiativeStore } from '@/store/initiatives';
import { Ref, ref } from 'vue';
import { ICreateInitiative } from '@/intefaces/initiative.interface';
import InitiativeCard from './Initiatives-Components/InitiativeCard.vue';

const showCreateInitiativeModal = ref(false);

const initiativeToCreate: Ref<ICreateInitiative> = ref({ name: '' });

const initiativeStore = useInitiativeStore();
</script>
