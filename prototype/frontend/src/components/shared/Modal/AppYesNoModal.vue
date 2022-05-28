<template>
	<AppModal :open="open">
		<div class="font-bold text-xl w-full text-left">
			<slot></slot>
		</div>
		<div class="w-full flex justify-end gap-5">
			<AppButton color="red" @click="$emit('cancel')">Cancel</AppButton>
			<AppButton @click="$emit('yes')">Yes</AppButton>
		</div>
	</AppModal>
</template>
<script setup lang="ts">
import AppModal from './AppModal.vue';
import AppButton from './AppButton.vue';

defineProps({
	open: Boolean,
});

defineEmits(['yes', 'cancel']);
</script>
