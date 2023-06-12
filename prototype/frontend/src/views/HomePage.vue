<template>
	<div
		class="relative flex h-screen w-screen flex-col gap-10 overflow-x-hidden p-20">
		<router-link class="absolute right-5 top-5" to="/app">
			<AppButton>Zum Anwendungs-Prototypen</AppButton>
		</router-link>
		<a
			target="_blank"
			:href="SWAGGER_DOCS_URL"
			class="absolute right-5 bottom-5">
			<AppButton>Open API Documentation</AppButton>
		</a>
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
			<div class="mx-auto w-1/2 text-lg">
				Agility plays a big role in managing the complexity of volatile and
				unpredictable environments, such as project management and project
				portfolio management, by focussing on the value created for the
				customer. This leads to the need of systematicaly scaling agile
				practices to enterprise level, which can be done by using i.e. the
				Scaled Agile Framework (SAFe) or Flight Levels and results in big
				organizational structures with multiple levels of planning and decision
				making, which have to be documented.
				<br />
				<br />
				For effective decision making in those environments, decisions should be
				made with metrics in mind that are relevant for the Level in which the
				decision must be made. This work presents a customizable software
				solution to document the organizational structure in a way that allows
				automatic aggregation of such metrics to the level required. These
				Metrics should be presented in a meaningful manner, providing insights
				on progress from levels below the one where the decision must be made in
				and what implications the decision will have on the levels above. Focus
				of this work is the adaptability of the solution regardless of the
				framework used to scale agile practices.
				<br />
				<br />
				The solution was evaluated in a case study to determine its usefulness
				as a webbased software. The results show that tha adaptability of the
				solution is given, but to be useful in a real world scenario, the
				solution needs to be extended with time-based metrics like velocity,
				etc. and the ability to not only import data from operational tools like
				Jira, but also a synchronization of data between the tools, to make the
				solution usable over time, since the data only represents a snapshot of
				the current state of the organization.
				<br />
				<br />
				<b>Keywords:</b>
				<br />
				agile portfolio management, agile project management, progress tracking,
				decision making, Flight Levels, Scaled Agile Framework, data
				aggregation, visualization, web development, mevn stack
			</div>
			<AppButton
				:disabled="true"
				tooltip="coming soon!"
				tooltip-position="top"
				@click="showPdf = true">
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
import { SWAGGER_DOCS_URL } from '@/config';
import { ref } from 'vue';

const showPdf = ref(false);
</script>
