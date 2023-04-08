<template>
	<div
		class="relative w-screen h-screen p-20 gap-10 flex flex-col overflow-x-hidden">
		<router-link class="absolute top-5 right-5" to="/app">
			<AppButton>Zum Anwendungs-Prototypen</AppButton>
		</router-link>
		<AppButton
			class="absolute top-5 left-1/2 -translate-x-1/2 transform transition-all"
			:class="{ 'scale-0': !showPdf }"
			@click="showPdf = false"
			>Zurück</AppButton
		>
		<div v-if="!showPdf" class="flex flex-col gap-5">
			<div class="text-3xl font-bold w-1/2 mx-auto text-shadow-lg">
				Konzeption und Entwicklung eines Systems zur softwaregestützten
				Dokumentation von Unternehmensstrukturen für automatisierte
				Fortschrittsmessung und Werteorientierung
			</div>
			<div class="text-xl italic text-shadow-lg">
				Bachelor Arbeit Maximilian Oedinger (25208)
			</div>
			<div class="text-xl italic font-serif">Abstract</div>
			<div class="text-justify text-lg w-1/2 mx-auto">
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
			class="w-full flex-grow shadow-lg shadow-gray-500 dark:shadow-dark-800" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const showPdf = ref(false);
</script>
