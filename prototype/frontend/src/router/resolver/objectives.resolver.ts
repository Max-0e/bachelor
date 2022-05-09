import { useObjectiveStore } from '@/store/objectives';

export async function objectivesResolver() {
	await resolveObjectives();
}

export async function objectiveDetailsResolver(to: any) {
	await resolveObjectives();
	// const currentObjective = useObjectiveStore().objectives.find(objective => objective.id === to.params['id']);
	// if (!!currentObjective) useObjectiveStore().currentObjective = currentObjective;
}

async function resolveObjectives() {
	if (!useObjectiveStore().isLoaded) {
		await useObjectiveStore().loadObjectives();
	}
}
