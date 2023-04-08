<template>
	<AppModal ref="modal">
		<div class="w-full text-left text-xl font-bold">
			<slot></slot>
		</div>
		<div class="flex w-full justify-end gap-5">
			<AppButton
				color="red"
				@click="
					close();
					$emit('cancel');
				"
				>Cancel</AppButton
			>
			<AppButton
				@click="
					close();
					$emit('yes');
				"
				>Yes</AppButton
			>
		</div>
	</AppModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AppModal from './AppModal.vue';

const modal = ref<InstanceType<typeof AppModal> | null>(null);

const open = () => modal.value!.open();
const close = () => modal.value!.close();

defineEmits(['yes', 'cancel']);
defineExpose({ open, close });
</script>
