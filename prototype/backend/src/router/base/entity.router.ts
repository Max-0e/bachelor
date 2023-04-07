import { Router } from 'express';
import { EntityController } from '../../controller/base/entity.controller';

export function makeEntityRouter<T>(entityController: EntityController<T>) {
	const router = Router();

	router.get('/', entityController.getEntities);
	router.get('/:id', entityController.getEntityById);
	router.post('/', entityController.createEntity);
	router.put('/:id', entityController.updateEntity);
	router.delete('/:id', entityController.deleteEntity);

	return router;
}