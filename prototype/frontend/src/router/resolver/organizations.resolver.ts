import { useOrganizationStore } from '@/store/organization.store';

export async function organizationsResolver() {
	if (!useOrganizationStore().isLoaded) {
		await useOrganizationStore().loadEntities();
	}
}
