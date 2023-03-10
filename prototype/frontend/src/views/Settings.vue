<template>
	<AppIcon button large @click="router.back()">arrow_back</AppIcon>
	<div>Settings</div>
	<AppToggleInput
		:initial-value="useAppStore().darkMode"
		label="Dark-Mode"
		@change="useAppStore().setDarkMode" />
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
