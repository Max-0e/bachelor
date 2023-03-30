<template>
	<div class="flex flex-col gap-10">
		OrganizationView
		<div
			v-for="organization in useOrganizationStore().entities"
			class="bg-gray-100 dark:bg-dark-700 rounded-md p-10 cursor-pointer"
			@click="
				$router.push('/app/organization/' + organization.id + '/dashboard')
			">
			{{ organization.name }}
		</div>
		<AppButton @click="createOrganizationFormModal?.open()"
			>Create new organization</AppButton
		>
	</div>
	<CreateOrganizationFormModal ref="createOrganizationFormModal" />
</template>
<script lang="ts" setup>
import { modalRef } from '@/interfaces/modal.interface';
import { useOrganizationStore } from '@/store/organization.store';

const createOrganizationFormModal = modalRef();
</script>
