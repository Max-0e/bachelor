<template>
	<div :class="useAppStore().darkMode ? 'dark' : ''">
		<div
			class="dark:(text-white bg-dark-200) relative overflow-hidden text-gray-600">
			<router-view />
			<div
				class="z-102 absolute left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-200 opacity-80 transition-all delay-75 dark:bg-black"
				:class="{ 'invisible !opacity-0': !isRouting }">
				<AppIcon class="animate-spin"> autorenew </AppIcon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isRouting = ref(false);
router.beforeEach((_) => (isRouting.value = true));
router.afterEach((_) => (isRouting.value = false));
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

.basic-shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.card {
	padding: 20px;
	border-radius: 20px;
}
a {
	text-decoration: none;
}

/* width */
::-webkit-scrollbar {
	width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
	background: rgb(50, 50, 50);
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: rgb(10, 10, 10);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: rgb(10, 10, 10);
}
</style>
