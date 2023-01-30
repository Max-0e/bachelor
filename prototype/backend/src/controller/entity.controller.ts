import {
	EntityCreateDto,
	EntityReadDto,
} from '@/interfaces/dtos/entityDto.interface';
import { EntityService } from '@/services/entity.service';
import { Request, Response } from 'express';
import sendResponse from '../utility/sendResponse';

export abstract class EntityController<T> {
	public readonly entityService;
	constructor(service: EntityService<T>) {
		this.entityService = service;
		this.getEntities = this.getEntities.bind(this);
		this.getEntityById = this.getEntityById.bind(this);
		this.createEntity = this.createEntity.bind(this);
		this.updateEntity = this.updateEntity.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
	}

	public async getEntities(req: Request, res: Response) {
		const entities = await this.entityService.getEntities();
		return await sendResponse.data<EntityReadDto<T>[]>(
			res,
			200,
			await this.entityService.mapArrayToDtoArray(entities)
		);
	}

	public async getEntityById(req: Request<IdRequest>, res: Response) {
		const entity = await this.entityService.getEntityById(req.params.id);
		return await sendResponse.data<EntityReadDto<T>>(
			res,
			200,
			await this.entityService.mapToDto(entity)
		);
	}

	public async createEntity(
		req: Request<{}, EntityReadDto<T>, EntityCreateDto<T>>,
		res: Response
	) {
		const createdEntity = await this.entityService.createEntity(req.body);
		return await sendResponse.data<EntityReadDto<T>>(
			res,
			201,
			await this.entityService.mapToDto(createdEntity)
		);
	}

	public async updateEntity(
		req: Request<IdRequest, EntityCreateDto<T>>,
		res: Response
	) {
		const updatedEntity = await this.entityService.updateEntity(
			req.params.id,
			req.body
		);
		return await sendResponse.data<EntityReadDto<T>>(
			res,
			203,
			await this.entityService.mapToDto(updatedEntity)
		);
	}

	public async deleteEntity(
		req: Request<IdRequest>,
		res: Response
	): Promise<Response> {
		await this.entityService.deleteEntityById(req.params.id);
		return await sendResponse.message(res, 204, 'success');
	}
}

interface IdRequest {
	id: string;
}
