import { useProjectStore } from '@/store/project';

export async function projectsResolver() {
	await resolveProjects();
}

export async function projectDetailsResolver(to: any) {
	await resolveProjects();
	// const currentProject = useProjectStore().projects.find(project => project.id === to.params['id']);
	// if (!!currentProject) useProjectStore().currentProject = currentProject;
}

async function resolveProjects() {
	if (!useProjectStore().isLoaded) {
		await useProjectStore().loadProjects();
	}
}
