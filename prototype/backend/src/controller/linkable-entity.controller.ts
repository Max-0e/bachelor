import { Request, Response } from 'express';
import { LinkableEntityService } from 'src/services/linkable-entity.service';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import sendResponse from '../utility/sendResponse';
import { OrganizationBasedEntityController } from './organization-based-entity.controller';

export abstract class LinkableEntityController<
	T
> extends OrganizationBasedEntityController<LinkableEntity<T>> {
	linkableEntityService: LinkableEntityService<LinkableEntity<T>>;
	constructor(service: LinkableEntityService<LinkableEntity<T>>) {
		super(service);
		this.linkableEntityService = service;
		this.linkEntityToEntityFromOtherHierarchy =
			this.linkEntityToEntityFromOtherHierarchy.bind(this);
	}
	async linkEntityToEntityFromOtherHierarchy(
		req: Request<{
			organizationId: string;
			entityId: string;
			entityToLinkToId: string;
		}>,
		res: Response
	) {
		const updatedEntity =
			await this.linkableEntityService.linkEntityToEntityFromOtherHierarchy(
				req.params.organizationId,
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
