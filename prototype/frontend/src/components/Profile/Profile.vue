<template>
	<AppIcon button large @click="router.back()">arrow_back</AppIcon>
	<div class="text-4xl text-left flex content-center gap-10 m-10">
		<AppChip> person </AppChip>
		<div>
			{{ useAuthStore().user?.username }}
		</div>
	</div>
	<div class="text-4xl text-left flex content-center gap-10 m-10">
		<AppChip> mail </AppChip>
		<div>
			{{ useAuthStore().user?.email }}
		</div>
	</div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
