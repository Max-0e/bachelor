<template>
	<LevelList></LevelList>
	<AppFloatingActionButton @click="createLevelFormModal?.open()"
		>add</AppFloatingActionButton
	>
	<CreateLevelFormModal ref="createLevelFormModal"></CreateLevelFormModal>
</template>
<script lang="ts" setup>
import { modalRef } from '@/intefaces/modal.interface';

const createLevelFormModal = modalRef();
</script>
