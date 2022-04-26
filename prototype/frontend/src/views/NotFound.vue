<template>
<div class="w-screen h-screen flex justify-center items-center">
	<div class="flex flex-col max-w-md">
        <span>Looks like this Page doesn't exist</span>
        <br>
        <br>
        <br>
        <router-link to="/app">
		    <AppButton>Take Me Back Home</AppButton>
	    </router-link>
	</div>
</div>
</template>

<script setup lang="ts">
import AppButton from '@/components/shared/AppButton.vue';</script>

<style scoped></style>
