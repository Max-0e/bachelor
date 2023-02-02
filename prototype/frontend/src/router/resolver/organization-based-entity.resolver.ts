import { NavigationGuardWithThis } from 'vue-router';

//TODO: fix typing
export function makeOrganizationBasedEntityResolver(useStore: any) {
	const resolver: NavigationGuardWithThis<void> = async (to) => {
		const organizationId = to.params.organizationId;
		if (
			typeof organizationId === 'string' &&
			!useStore().loadedOrganizations.includes(organizationId)
		)
			await useStore().loadEntities(organizationId);
	};
	return resolver;
}
