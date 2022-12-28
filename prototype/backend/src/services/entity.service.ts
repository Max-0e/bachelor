import { EntityCreateDto, EntityReadDto } from '@/interfaces/dtos/entityDto.interface';
import { Entity, EntityDocument } from '@/interfaces/entity.interface';
import { Model } from 'mongoose';
import { NotFoundError } from '../error/not-found.error';

export abstract class EntityService<T> {

	public readonly EntityModel;

	constructor(entityModel: Model<Entity<T>>) {
		this.EntityModel = entityModel;
	}
	public async getEntities(): Promise<EntityDocument<T>[]> {
		return await this.EntityModel.find();
	}
	public async getEntityById(id: string) {
		const entity = await this.EntityModel.findById(id);
		if (!entity) throw new NotFoundError('This Entity does not exists.');

		return entity;
	}

	public async createEntity(entity: EntityCreateDto<T>): Promise<EntityDocument<T>> {
		const entityModel = new this.EntityModel({ ...entity });
		const newEntity = await entityModel.save();

		return this.getEntityById(newEntity._id);
	}

	public async updateEntity(entityId: string, entity: EntityCreateDto<T>) {
		const entityToUpdate = await this.getEntityById(entityId);
		const updatedEntity = {
			_id: entityId,
			...entity
		}
		await entityToUpdate.updateOne(updatedEntity);
		return await this.getEntityById(entityId);
	}

	public async deleteEntityById(id: string) {
		const entity = await this.getEntityById(id);
		return entity.delete();
	}

	public async mapToDto(entity: EntityDocument<T>) {
		return entity.toJSON() as EntityReadDto<T>
	}

	public async mapArrayToDtoArray(entities: EntityDocument<T>[]): Promise<EntityReadDto<T>[]> {
		return Promise.all(entities.map(async (entity) => await this.mapToDto(entity)))
	}
}
