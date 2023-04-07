import { Router } from 'express';
import { OrganizationBasedEntityController } from '../../controller/base/organization-based-entity.controller';

export function makeOrganizationBasedEntityRouter<T>(
	controller: OrganizationBasedEntityController<T>
) {
	const router = Router();

	router.get('/:organizationId/', controller.getEntities);
	router.get('/:organizationId/:id', controller.getEntityById);
	router.post('/:organizationId/', controller.createEntity);
	router.post('/:organizationId/multiple', controller.createMultipleEntities);
	router.put('/:organizationId/:id', controller.updateEntity);
	router.delete('/:organizationId/:id', controller.deleteEntity);

	return router;
}
