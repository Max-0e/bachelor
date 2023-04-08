<template>
	<div class="flex flex-col gap-10">
		Organization View
		<div
			v-for="organization in useOrganizationStore().entities"
			class="bg-gray-100 dark:bg-dark-700 rounded-md p-10 cursor-pointer relative shadow-lg"
			@click="
				$router.push('/app/organization/' + organization.id + '/dashboard')
			">
			{{ organization.name }}
			<AppIcon
				class="absolute right-5 top-7"
				@click.stop
				@click="
					organizationToDelete = organization;
					deleteOrganizationModal?.open();
				"
				button
				>delete</AppIcon
			>
		</div>
		<AppButton @click="createOrganizationFormModal?.open()"
			>Create new organization</AppButton
		>
	</div>
	<CreateOrganizationFormModal ref="createOrganizationFormModal" />
	<AppYesNoModal
		ref="deleteOrganizationModal"
		@yes="organizationStore.deleteEntity(organizationToDelete!)">
		Do you really want to delete the Organization
		{{ organizationToDelete?.name }}?
	</AppYesNoModal>
</template>
<script lang="ts" setup>
import { modalRef } from '@/interfaces/modal.interface';
import { Organization } from '@/interfaces/organization.interface';
import { useOrganizationStore } from '@/store/organization.store';
import { ref } from 'vue';

const organizationStore = useOrganizationStore();
const createOrganizationFormModal = modalRef();

const deleteOrganizationModal = modalRef();

const organizationToDelete = ref<Organization>();
</script>
