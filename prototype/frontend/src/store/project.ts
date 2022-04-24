import { ICreateProject, IProject } from '@/intefaces/project.interface';
import router from '@/router';
import projectService from '@/services/project.service';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

export const useProjectStore = defineStore('project', {
	state: () => ({
        projects: [] as IProject[],
		currentProject: {} as IProject,
		isLoaded: false as boolean
	}),

	getters: {},

	actions: {
		async loadProjects() {
			await projectService.getProjects().then(projects => {
				this.projects = projects;
				this.isLoaded = true;
			});
		},
		createProject(projectToCreate: ICreateProject){
			projectService.createProject(projectToCreate).then(project => {
				this.projects.push(project);
				showSuccessToast('created');
			})
		},
		updateProject(projectToUpdate: IProject) {
			projectService.updateProject(projectToUpdate._id, { name: projectToUpdate.name })
			.then(project => {
				this.projects[this.projects.findIndex(projectInState => projectInState._id === project._id)] = project;
				showSuccessToast('updated');
			})
		},
		deleteProject(project: IProject) {
			projectService.deleteProject(project).then(_ => {
				this.projects = this.projects.filter(projectInState => projectInState._id !== project._id);
				showSuccessToast('deleted');
			})
		},
		deleteCurrentProject(){
			this.deleteProject(this.currentProject);
			router.push('/projects');
		}
	},
});

function showSuccessToast(operation: string){
	useToast().success(`Successfully ${operation} Project`, { timeout: 1500 });
}
