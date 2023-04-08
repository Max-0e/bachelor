<template>
	<div
		class="relative flex h-screen w-screen flex-col gap-10 overflow-x-hidden p-20">
		<router-link class="absolute right-5 top-5" to="/app">
			<AppButton>Zum Anwendungs-Prototypen</AppButton>
		</router-link>
		<AppButton
			class="absolute left-1/2 top-5 -translate-x-1/2 transform transition-all"
			:class="{ 'scale-0': !showPdf }"
			@click="showPdf = false"
			>Zurück</AppButton
		>
		<div v-if="!showPdf" class="flex flex-col gap-5">
			<div class="text-shadow-lg mx-auto w-1/2 text-3xl font-bold">
				Konzeption und Entwicklung eines Systems zur softwaregestützten
				Dokumentation von Unternehmensstrukturen für automatisierte
				Fortschrittsmessung und Werteorientierung
			</div>
			<div class="text-shadow-lg text-xl italic">
				Bachelor Arbeit Maximilian Oedinger (25208)
			</div>
			<div class="font-serif text-xl italic">Abstract</div>
			<div class="mx-auto w-1/2 text-justify text-lg">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
				clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
				nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
				sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
				rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
				ipsum dolor sit amet.
				<br />
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
				clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
				esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
				vero eros et accumsan et iusto odio dignissim qui blandit praesent
				luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
				Lorem ipsum dolor sit amet
			</div>
			<AppButton @click="showPdf = true">
				Vollständigen Text anzeigen
			</AppButton>
		</div>
		<embed
			v-else
			src="/main.pdf"
			class="dark:shadow-dark-800 w-full flex-grow shadow-lg shadow-gray-500" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const showPdf = ref(false);
</script>
