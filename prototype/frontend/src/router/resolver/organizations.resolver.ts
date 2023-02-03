import { useOrganizationStore } from '@/store/organization.store';

export async function organizationsResolver() {
	if (!useOrganizationStore().isLoaded) {
		const organizationStore = useOrganizationStore();
		await organizationStore.loadEntities();
	}
}
