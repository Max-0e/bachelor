import { Model } from 'mongoose';
import { NotFoundError } from '../error/not-found.error';
import {
	EntityCreateDto,
	EntityReadDto,
} from '../interfaces/dtos/entityDto.interface';
import { Entity, EntityDocument } from '../interfaces/entity.interface';

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
		if (!entity)
			throw new NotFoundError(`Entity with id ${id} does not exists.`);

		return entity;
	}

	public async createEntity(
		entity: EntityCreateDto<T>
	): Promise<EntityDocument<T>> {
		this.validateEntityCreateDto(entity);
		const entityModel = new this.EntityModel({ ...entity });
		const newEntity = await entityModel.save();
		return await this.getEntityById(newEntity._id);
	}

	public async updateEntity(entityId: string, entity: EntityCreateDto<T>) {
		this.validateEntityUpdateDto(entity);
		const entityToUpdate = await this.getEntityById(entityId);
		const updatedEntity = {
			_id: entityId,
			...entity,
		};
		await entityToUpdate.updateOne(updatedEntity);
		return await this.getEntityById(entityId);
	}

	public async deleteEntityById(id: string) {
		const entity = await this.getEntityById(id);
		await entity.delete();
		return entity;
	}

	public mapToDto(entity: EntityDocument<T>) {
		return entity.toJSON() as EntityReadDto<T>;
	}

	public mapArrayToDtoArray(entities: EntityDocument<T>[]): EntityReadDto<T>[] {
		return entities.map((entity) => this.mapToDto(entity));
	}

	abstract validateEntityCreateDto(entity: EntityCreateDto<T>): void;
	abstract validateEntityUpdateDto(entity: EntityCreateDto<T>): void;
}
