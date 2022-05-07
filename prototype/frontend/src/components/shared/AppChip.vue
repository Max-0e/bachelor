<template>
	<div
		class="transition-all cursor-pointer rounded-full w-12 h-12 flex items-center justify-around bg-light-600 hover:(shadow-md) dark:(bg-gray-600)">
		<span class="text-3xl material-icons"><slot></slot></span>
	</div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
