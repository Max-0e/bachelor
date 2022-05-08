import { useInitiativeStore } from '@/store/initiatives';

export async function initiativesResolver() {
	await resolveInitiatives();
}

export async function initiativeDetailsResolver(to: any) {
	await resolveInitiatives();
	// const currentInitiative = useInitiativeStore().initiatives.find(initiative => initiative.id === to.params['id']);
	// if (!!currentInitiative) useInitiativeStore().currentInitiative = currentInitiative;
}

async function resolveInitiatives() {
	if (!useInitiativeStore().isLoaded) {
		await useInitiativeStore().loadInitiatives();
	}
}
