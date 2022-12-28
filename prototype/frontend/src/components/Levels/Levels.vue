<template>
	<AppFloatingActionButton @click="createLevelModal.open()"
		>add</AppFloatingActionButton
	>
	<AppModal ref="createLevelModal">
		<CreateLevelForm></CreateLevelForm>
	</AppModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const createLevelModal = ref();
</script>
