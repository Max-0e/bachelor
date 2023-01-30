import { Request, Response } from 'express';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import { LinkableEntityService } from '../services/linkable-entity.service';
import sendResponse from '../utility/sendResponse';
import { EntityController } from './entity.controller';

export abstract class LinkableEntityController<T> extends EntityController<
	LinkableEntity<T>
> {
	linkableEntityService: LinkableEntityService<T>;
	constructor(service: LinkableEntityService<T>) {
		super(service);
		this.linkableEntityService = service;
		this.linkEntityToEntityFromOtherHirarchy =
			this.linkEntityToEntityFromOtherHirarchy.bind(this);
	}
	async linkEntityToEntityFromOtherHirarchy(
		req: Request<{ entityId: string; entityToLinkToId: string }>,
		res: Response
	) {
		const updatedEntity =
			await this.linkableEntityService.linkEntityToEntityFromOtherHirarchy(
				req.params.entityId,
				req.params.entityToLinkToId
			);

		return await sendResponse.data(
			res,
			202,
			this.linkableEntityService.mapToDto(updatedEntity)
		);
	}
}
