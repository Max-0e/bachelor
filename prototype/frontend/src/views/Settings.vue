<template>
	<div>Settings</div>
	<AppToggleInput
		:initial-value="useAppStore().darkMode"
		label="Dark-Mode"
		@change="useAppStore().setDarkMode" />
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
</script>
