import { ICreateInitiative, IInitiative } from '@/intefaces/initiative.interface';
import { IProject } from '@/intefaces/project.interface';
import router from '@/router';
import initiativeService from '@/services/initiative.service';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useObjectiveStore } from './objectives';
import { useProjectStore } from './project';

export const useInitiativeStore = defineStore('initiative', {
	state: () => ({
		initiatives: [] as IInitiative[],
		isLoaded: false as boolean,
	}),

	getters: {
		getCurrentInitiative(state) {
			return state.initiatives.find((initiative) => initiative.id === router.currentRoute.value.params['id']);
		},
		getInitiativesFromCurrentObjective(state) {
			return state.initiatives.filter((initiative) =>
				useObjectiveStore().getCurrentObjective?.initiatives.find((initiativeId) => initiativeId === initiative.id)
			);
		},
	},

	actions: {
		getProjectsForInitiative(initiative: IInitiative) {
			return useProjectStore().projects.filter(
				(project) => !!initiative.projects.find((projectId) => projectId === project.id)
			);
		},
		getMetrics(projects: IProject[]) {
			const projectProgressArray = projects.map((project) =>
				Math.round((project.tasks.filter((task) => task.done).length / project.tasks.length) * 100)
			);
			const averageProjectProgress = calculateTotal(projectProgressArray) / projectProgressArray.length;

			const totalDoneTasks = calculateTotal(
				projects.map((project) => project.tasks.filter((task) => task.done).length)
			);
			const totalTasksInInitiative = calculateTotal(projects.map((project) => project.tasks.length));

			const totalProgress = Math.round((totalDoneTasks / totalTasksInInitiative) * 100);

			return { totalProgress, averageProjectProgress };
		},
		async loadInitiatives() {
			await initiativeService.getInitiatives().then((initiatives) => {
				this.initiatives = initiatives;
				this.isLoaded = true;
			});
		},
		createInitiative(initiativeToCreate: ICreateInitiative) {
			initiativeService.createInitiative(initiativeToCreate).then((initiative) => {
				this.initiatives.push(initiative);
				showSuccessToast('created');
			});
		},
		updateInitiative(initiativeToUpdate: IInitiative) {
			initiativeService
				.updateInitiative(initiativeToUpdate.id, { name: initiativeToUpdate.name })
				.then((initiative) => {
					this.updateInitiativeInState(initiative);
					showSuccessToast('updated');
				});
		},
		addProjectToInitiative(initiativeToUpdate: IInitiative, project: IProject) {
			initiativeService.addProjectToInitiative(initiativeToUpdate, project).then((initiative) => {
				this.updateInitiativeInState(initiative);
				showSuccessToast('updated');
			});
		},
		updateInitiativeInState(initiative: IInitiative) {
			this.initiatives[this.initiatives.findIndex((initiativeInState) => initiativeInState.id === initiative.id)] =
				initiative;
		},
		removeProjectFromInitiative(initiativeToUpdate: IInitiative, project: IProject) {
			initiativeService.removeProjectFromInitiative(initiativeToUpdate, project).then((initiative) => {
				this.updateInitiativeInState(initiative);
				showSuccessToast('updated');
			});
		},
		removeProjectFromCurrentInitiative(project: IProject) {
			if (!this.getCurrentInitiative) return;
			this.removeProjectFromInitiative(this.getCurrentInitiative, project);
		},
		deleteInitiative(initiative: IInitiative) {
			initiativeService.deleteInitiative(initiative).then((_) => {
				this.deleteInitiativeInState(initiative);
				showSuccessToast('deleted');
			});
		},
		deleteInitiativeInState(initiative: IInitiative) {
			this.initiatives = this.initiatives.filter((initiativeInState) => initiativeInState.id !== initiative.id);
		},
		deleteCurrentInitiative() {
			const currentInitiative = this.getCurrentInitiative;
			if (!currentInitiative) {
				showErrorToast();
				return;
			}
			this.deleteInitiative(currentInitiative);
			router.push({name: 'Initiatives'});
		},
	},
});

function showErrorToast() {
	useToast().error(`Something went wrong`, { timeout: 1500 });
}

function showSuccessToast(operation: string, entity: string = 'Initiative') {
	useToast().success(`Successfully ${operation} ${entity}`, { timeout: 1500 });
}

function calculateTotal(numberArray: number[]) {
	return numberArray.reduce((a, b) => a + b, 0);
}
