<template>
	<div class="flex h-screen w-screen items-center justify-center">
		<div class="flex max-w-md flex-col">
			<span>Looks like this Page doesn't exist</span>
			<br />
			<br />
			<br />
			<router-link to="/app">
				<AppButton>Take Me Back Home</AppButton>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppButton from '@/components/shared/Input/AppButton.vue';
</script>

<style scoped></style>
