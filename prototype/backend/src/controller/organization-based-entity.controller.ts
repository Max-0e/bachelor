import { Request, Response } from 'express';
import { OrganizationBasedEntity } from 'src/interfaces/organization-based-entity.interface';
import { OrganizationBasedEntityService } from 'src/services/organization-based-entity.service';
import {
	EntityCreateDto,
	EntityReadDto,
} from '../interfaces/dtos/entityDto.interface';
import sendResponse from '../utility/sendResponse';

export abstract class OrganizationBasedEntityController<T> {
	public readonly entityService;
	constructor(service: OrganizationBasedEntityService<T>) {
		this.entityService = service;
		this.getEntities = this.getEntities.bind(this);
		this.getEntityById = this.getEntityById.bind(this);
		this.createEntity = this.createEntity.bind(this);
		this.updateEntity = this.updateEntity.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
	}

	public async getEntities(req: Request<OrganizationIdReqest>, res: Response) {
		const entities = await this.entityService.getOrganizationBasedEntities(
			req.params.organizationId
		);
		return await sendResponse.data<EntityReadDto<OrganizationBasedEntity<T>>[]>(
			res,
			200,
			this.entityService.mapArrayToDtoArray(entities)
		);
	}

	public async getEntityById(
		req: Request<OrganizationIdReqest & IdRequest>,
		res: Response
	) {
		const entity = await this.entityService.getOrganizationBasedEntityById(
			req.params.organizationId,
			req.params.id
		);
		return await sendResponse.data<EntityReadDto<OrganizationBasedEntity<T>>>(
			res,
			200,
			this.entityService.mapToDto(entity)
		);
	}

	public async createEntity(
		req: Request<OrganizationIdReqest, EntityReadDto<T>, EntityCreateDto<T>>,
		res: Response
	) {
		const createdEntity =
			await this.entityService.createOrganizationBasedEntity(
				req.params.organizationId,
				req.body
			);
		return await sendResponse.data<EntityReadDto<OrganizationBasedEntity<T>>>(
			res,
			201,
			this.entityService.mapToDto(createdEntity)
		);
	}

	public async updateEntity(
		req: Request<OrganizationIdReqest & IdRequest, EntityCreateDto<T>>,
		res: Response
	) {
		const updatedEntity =
			await this.entityService.updateOrganizationBasedEntity(
				req.params.organizationId,
				req.params.id,
				req.body
			);
		return await sendResponse.data<EntityReadDto<OrganizationBasedEntity<T>>>(
			res,
			203,
			this.entityService.mapToDto(updatedEntity)
		);
	}

	public async deleteEntity(
		req: Request<OrganizationIdReqest & IdRequest>,
		res: Response
	): Promise<Response> {
		await this.entityService.deleteOrganizationBasedEntityById(
			req.params.organizationId,
			req.params.id
		);
		return await sendResponse.message(res, 204, 'success');
	}
}

type OrganizationIdReqest = {
	organizationId: string;
};

type IdRequest = {
	id: string;
};
