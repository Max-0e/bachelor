import { LinkableEntityController } from '../controller/linkable-entity.controller';
import { makeOrganizationBasedEntityRouter } from './organization-based-entity.router';

export function makeLinkableEntityRouter<T>(
	linkableEntityController: LinkableEntityController<T>
) {
	const router = makeOrganizationBasedEntityRouter(linkableEntityController);

	router.post(
		'/:organizationId/link/:entityId/:entityToLinkToId',
		linkableEntityController.linkEntityToEntityFromOtherHierarchy
	);

	return router;
}
