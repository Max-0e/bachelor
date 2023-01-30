import { useGroupStore } from '@/store/entity-groups.store';

export async function groupsResolver() {
	if (!useGroupStore().isLoaded) {
		await useGroupStore().loadEntities();
	}
}
