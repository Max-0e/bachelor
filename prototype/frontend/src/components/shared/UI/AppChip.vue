<template>
	<div
		class="bg-light-600 hover:(shadow-md) dark:(bg-gray-600) flex h-12 w-12 cursor-pointer items-center justify-around rounded-full transition-all">
		<span class="material-icons text-3xl"><slot></slot></span>
	</div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
