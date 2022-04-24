<template>
<div :class="useAppStore().darkMode ? 'dark':''">
<div class="text-gray-600 dark:(text-white bg-dark-200)">
	<router-view />
</div>
</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
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

#nav a.router-link-exact-active {
	color: #42b983;
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
</style>
