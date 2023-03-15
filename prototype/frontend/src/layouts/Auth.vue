<template>
	<div class="relative w-screen h-screen pt-40">
		<router-link class="absolute top-5 left-5" to="/home">
			<AppButton>To Home Page</AppButton>
		</router-link>
		<div class="flex flex-col max-w-md mx-auto">
			<form>
				<router-view />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
