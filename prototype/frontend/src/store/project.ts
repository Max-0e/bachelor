import { IInitiative } from '@/intefaces/initiative.interface';
import { ICreateProject, IProject } from '@/intefaces/project.interface';
import { ICreateTask, ITask, Status } from '@/intefaces/task.interface';
import router from '@/router';
import projectService from '@/services/project.service';
import taskService from '@/services/task.service';
import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useInitiativeStore } from './initiatives';

export const useProjectStore = defineStore('project', {
	state: () => ({
		projects: [] as IProject[],
		isLoaded: false as boolean,
	}),

	getters: {
		getCurrentProject(state): IProject {
			const project = state.projects.find((project) => project.id === router.currentRoute.value.params['id']);
			if (!project) throw "No Current Project";
			return project
		},
		getProjectsFromCurrentInitiative(state) {
			return state.projects.filter((project) =>
				useInitiativeStore().getCurrentInitiative?.projects.find((projectId) => projectId === project.id)
			);
		},
		getProjectsForInitiativeInitiative(state) {
			return (initiative: IInitiative) => state.projects.filter((project) =>
				initiative.projects.find((projectId) => projectId === project.id)
			);
		},
	},

	actions: {
		computeMetrics(project: Ref<IProject>){
			const openTasksLength = computed(() => 
				project.value.tasks.filter((task) => task.status === Status.open).length
			);
			const inProgressTasksLength = computed(() =>
				project.value.tasks.filter((task) => task.status === Status.inProgress).length
			);
			const doneTasksLength = computed(() => 
				project.value.tasks.filter((task) => task.status === Status.done).length
			);

			const progress = computed(() => 
				Math.round((doneTasksLength.value / project.value.tasks.length) * 100)
			);

			return ref({
				openTasksLength,
				inProgressTasksLength,
				doneTasksLength,
				progress
			})
		},
		getProjectsForInitiative(initiative: Ref<IInitiative>): Ref<IProject[]>{
			const projects = computed(() => 
				this.projects.filter((project) =>
					initiative.value.projects.includes(project.id)
			));

			return projects;
		},
		async loadProjects() {
			await projectService.getProjects().then((projects) => {
				this.projects = projects;
				this.isLoaded = true;
			});
		},
		createProject(projectToCreate: ICreateProject) {
			projectService.createProject(projectToCreate).then((project) => {
				this.projects.push(project);
				showSuccessToast('created');
			});
		},
		updateProject(projectToUpdate: IProject) {
			projectService.updateProject(projectToUpdate.id, { name: projectToUpdate.name }).then((project) => {
				this.updateProjectInState(project);
				showSuccessToast('updated');
			});
		},
		updateProjectInState(project: IProject) {
			this.projects[this.projects.findIndex((projectInState) => projectInState.id === project.id)] = project;
		},
		deleteProject(project: IProject) {
			projectService.deleteProject(project).then((_) => {
				this.deleteProjectInState(project);
				showSuccessToast('deleted');
			});
		},
		deleteProjectInState(project: IProject) {
			this.projects = this.projects.filter((projectInState) => projectInState.id !== project.id);
		},
		deleteCurrentProject() {
			const currentProject = this.getCurrentProject;
			if (!currentProject) {
				showErrorToast();
				return;
			}
			this.deleteProject(currentProject);
			router.push({ name: 'Projects' });
		},
		createTask(project: IProject, taskToCreate: ICreateTask) {
			taskService.createTask(project.id, taskToCreate).then((task) => {
				project.tasks.push(task);
				this.updateProjectInState(project);
				showSuccessToast('created', 'task');
			});
		},
		updateTask(project: IProject, updateTask: ITask) {
			taskService.updateTask(updateTask).then((task) => {
				project.tasks[project.tasks.findIndex((taskInProject) => taskInProject.id === task.id)] = task;
				this.updateProjectInState(project);
				showSuccessToast('updated', 'task');
			});
		},
		deleteTask(project: IProject, taskToDelete: ITask) {
			taskService.deleteTask(taskToDelete).then((_) => {
				project.tasks = project.tasks.filter((taskInProject) => taskInProject.id !== taskToDelete.id);
				this.updateProjectInState(project);
				showSuccessToast('deleted', 'task');
			});
		},
	},
});

function showErrorToast() {
	useToast().error(`Something went wrong`, { timeout: 1500 });
}

function showSuccessToast(operation: string, entity: string = 'Project') {
	useToast().success(`Successfully ${operation} ${entity}`, { timeout: 1500 });
}
