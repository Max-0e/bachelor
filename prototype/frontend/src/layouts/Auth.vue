<template>
	<div class="relative h-screen w-screen pt-40">
		<router-link class="absolute left-5 top-5" to="/home">
			<AppButton>To Home Page</AppButton>
		</router-link>
		<div class="mx-auto flex max-w-md flex-col">
			<form>
				<router-view />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
