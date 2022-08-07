import sendResponse from '../utility/sendResponse';
import { NextFunction, Request, Response } from 'express';
import { EntityService } from '@/services/entity.service';

export abstract class EntityController<T, DTO> {
    public readonly entityService: EntityService<T, DTO>;
    constructor (service: EntityService<T, DTO>) {
        this.entityService = service;
        this.getEntities = this.getEntities.bind(this);
        this.getEntityById = this.getEntityById.bind(this);
        this.createEntity = this.createEntity.bind(this);
        this.updateEntity = this.updateEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
    }
	public async getEntities(req: Request, res: Response): Promise<Response> {
		const entities = await this.entityService.getEntities();
		return await sendResponse.data(res, 200, this.entityService.mapArrayToDtoArray(entities));
	}

	public async getEntityById(req: Request, res: Response): Promise<Response> {
		const entity = await this.entityService.getEntityById(req.params.id);
		return await sendResponse.data(res, 200, this.entityService.mapToDto(entity));
	}

	public async createEntity(req: Request, res: Response): Promise<Response> {
		const createdEntity = await this.entityService.createEntity(req.body as T);
		return await sendResponse.data(res, 201, this.entityService.mapToDto(createdEntity));
	}
	public async updateEntity(req: Request, res: Response): Promise<Response> {
		const updatedEntity = await this.entityService.updateEntity(req.params.id as string, req.body as T);
		return await sendResponse.data(res, 203, this.entityService.mapToDto(updatedEntity));
	}

	public async deleteEntity(req: Request, res: Response): Promise<Response> {
		await this.entityService.deleteEntityById(req.params.id);
		return await sendResponse.message(res, 204, 'success');
	}
}
