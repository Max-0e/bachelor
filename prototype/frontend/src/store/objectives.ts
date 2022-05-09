import { ICreateObjective, IObjective } from '@/intefaces/objective.interface';
import { IInitiative } from '@/intefaces/initiative.interface';
import router from '@/router';
import objectiveService from '@/services/objective.service';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useInitiativeStore } from './initiatives';

export const useObjectiveStore = defineStore('objective', {
	state: () => ({
		objectives: [] as IObjective[],
		isLoaded: false as boolean,
	}),

	getters: {
		getCurrentObjective(state) {
			return state.objectives.find((objective) => objective.id === router.currentRoute.value.params['id']);
		},
	},

	actions: {
		getInitiativesForObjective(objective: IObjective) {
			return useInitiativeStore().initiatives.filter(
				(initiative) => !!objective.initiatives.find((initiativeId) => initiativeId === initiative.id)
			);
		},
		// getMetrics(initiatives: IInitiative[]) {
		// 	const initiativeProgressArray = initiatives.map((initiative) =>
		// 		Math.round((initiative.tasks.filter((task) => task.done).length / initiative.tasks.length) * 100)
		// 	);
		// 	const averageInitiativeProgress = calculateTotal(initiativeProgressArray) / initiativeProgressArray.length;

		// 	const totalDoneTasks = calculateTotal(
		// 		initiatives.map((initiative) => initiative.tasks.filter((task) => task.done).length)
		// 	);
		// 	const totalTasksInObjective = calculateTotal(initiatives.map((initiative) => initiative.tasks.length));

		// 	const totalProgress = Math.round((totalDoneTasks / totalTasksInObjective) * 100);

		// 	return { totalProgress, averageInitiativeProgress };
		// },
		async loadObjectives() {
			await objectiveService.getObjectives().then((objectives) => {
				this.objectives = objectives;
				this.isLoaded = true;
			});
		},
		createObjective(objectiveToCreate: ICreateObjective) {
			objectiveService.createObjective(objectiveToCreate).then((objective) => {
				this.objectives.push(objective);
				showSuccessToast('created');
			});
		},
		updateObjective(objectiveToUpdate: IObjective) {
			objectiveService.updateObjective(objectiveToUpdate.id, { name: objectiveToUpdate.name }).then((objective) => {
				this.updateObjectiveInState(objective);
				showSuccessToast('updated');
			});
		},
		addInitiativeToObjective(objectiveToUpdate: IObjective, initiative: IInitiative) {
			objectiveService.addInitiativeToObjective(objectiveToUpdate, initiative).then((objective) => {
				this.updateObjectiveInState(objective);
				showSuccessToast('updated');
			});
		},
		updateObjectiveInState(objective: IObjective) {
			this.objectives[this.objectives.findIndex((objectiveInState) => objectiveInState.id === objective.id)] =
				objective;
		},
		removeInitiativeFromObjective(objectiveToUpdate: IObjective, initiative: IInitiative) {
			objectiveService.removeInitiativeFromObjective(objectiveToUpdate, initiative).then((objective) => {
				this.updateObjectiveInState(objective);
				showSuccessToast('updated');
			});
		},
		removeInitiativeFromCurrentObjective(initiative: IInitiative) {
			if (!this.getCurrentObjective) return;
			this.removeInitiativeFromObjective(this.getCurrentObjective, initiative);
		},
		deleteObjective(objective: IObjective) {
			objectiveService.deleteObjective(objective).then((_) => {
				this.deleteObjectiveInState(objective);
				showSuccessToast('deleted');
			});
		},
		deleteObjectiveInState(objective: IObjective) {
			this.objectives = this.objectives.filter((objectiveInState) => objectiveInState.id !== objective.id);
		},
		deleteCurrentObjective() {
			const currentObjective = this.getCurrentObjective;
			if (!currentObjective) {
				showErrorToast();
				return;
			}
			this.deleteObjective(currentObjective);
			router.push('/objectives');
		},
	},
});

function showErrorToast() {
	useToast().error(`Something went wrong`, { timeout: 1500 });
}

function showSuccessToast(operation: string, entity: string = 'Objective') {
	useToast().success(`Successfully ${operation} ${entity}`, { timeout: 1500 });
}

function calculateTotal(numberArray: number[]) {
	return numberArray.reduce((a, b) => a + b, 0);
}
