import { LinkableEntityController } from '../controller/linkable-entity.controller';
import { makeEntityRouter } from './entity.router';

export function makeLinkableEntityRouter<T>(
	linkableEntityController: LinkableEntityController<T>
) {
	const router = makeEntityRouter(linkableEntityController);

	router.post(
		'/link/:entityId/:entityToLinkToId',
		linkableEntityController.linkEntityToEntityFromOtherHirarchy
	);

	return router;
}
