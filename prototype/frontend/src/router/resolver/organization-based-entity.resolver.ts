import { NavigationGuardWithThis } from 'vue-router';

//TODO: fix typing
export function makeOrganizationBasedEntityResolver(useStore: any) {
	const resolver: NavigationGuardWithThis<void> = async (to) => {
		const store = useStore();
		const organizationId = to.params.organizationId;
		if (
			typeof organizationId === 'string' &&
			!store.loadedOrganizations.includes(organizationId)
		)
			await store.loadEntities(organizationId);
	};
	return resolver;
}
