import { Request, Response } from 'express';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import { LinkableEntityService } from '../services/linkable-entity.service';
import { taskService } from '../services/tasks.service';
import sendResponse from '../utility/sendResponse';
import {
	IdRequest,
	OrganizationBasedEntityController,
	OrganizationIdRequest,
} from './organization-based-entity.controller';

export abstract class LinkableEntityController<
	T
> extends OrganizationBasedEntityController<LinkableEntity<T>> {
	linkableEntityService: LinkableEntityService<LinkableEntity<T>>;
	taskService;
	constructor(service: LinkableEntityService<LinkableEntity<T>>) {
		super(service);
		this.linkableEntityService = service;
		this.taskService = taskService;
		this.linkEntityToEntityFromOtherHierarchy =
			this.linkEntityToEntityFromOtherHierarchy.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
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

	public override async deleteEntity(
		req: Request<OrganizationIdRequest & IdRequest>,
		res: Response
	): Promise<Response> {
		const deletedEntity =
			await this.entityService.deleteOrganizationBasedEntityById(
				req.params.organizationId,
				req.params.id
			);
		const isProject =
			await this.linkableEntityService.unlinkOrDeleteRelatedEntities(
				req.params.organizationId,
				deletedEntity
			);

		if (isProject) {
			await this.taskService.deleteAllTasksForProject(req.params.id);
		}
		return await sendResponse.message(res, 204, 'success');
	}
}
