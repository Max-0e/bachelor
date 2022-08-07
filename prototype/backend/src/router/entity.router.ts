import { EntityController } from "@/controller/entity.controller";
import { Router } from "express";

export function makeEntityRouter<T, DTO> (entityController: EntityController<T, DTO>) {
	const router = Router();

	router.get('/', entityController.getEntities);
	router.get('/:id', entityController.getEntityById);
	router.post('/', entityController.createEntity);
    router.delete('/:id', entityController.deleteEntity);

	return router;
}