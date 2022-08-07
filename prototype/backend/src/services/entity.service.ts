import { NotFoundError } from '../error/not-found.error';
import { EntityDocument } from '@/interfaces/entity.interface';
import { FilterQuery, Model } from 'mongoose';

export abstract class EntityService<T,DTO> {

    public readonly EntityModel: Model<T>;

    constructor (entityModel: Model<T>) {
        this.EntityModel = entityModel;
    }
	public async getEntities(): Promise<EntityDocument<T>[]> {
		return await this.EntityModel.find();
	}
	public async getEntityById(id: string): Promise<EntityDocument<T>> {
		const entity = await this.EntityModel.findOne({ _id: id } as FilterQuery<T>);
		if (!entity) throw new NotFoundError('This Entity does not exists.');

		return entity;
	}

	public async createEntity(entity: T): Promise<EntityDocument<T>> {
		const entityModel = new this.EntityModel({ ...entity });
		const newEntity = await entityModel.save();

		return this.getEntityById(newEntity._id);
	}

	public async updateEntity(entityId: string, entity: T) {
		const entityToUpdate = await this.getEntityById(entityId);
		await entityToUpdate.updateOne(entity);
		return await this.getEntityById(entityId);
	}

	public async deleteEntityById(id: string) {
		const entity = await this.getEntityById(id);
		return entity.delete();
	}

	public async mapToDto(entity: EntityDocument<T>): Promise<DTO>  {
		const dto = {
			id: entity._id,
            // TODO this should be possible in another way
			...(entity as any)._doc
		};
        delete dto._id;
        delete dto.__v;
        return dto as DTO;
	}

	public async mapArrayToDtoArray(entities: EntityDocument<T>[]): Promise<DTO[]> {
		return Promise.all(entities.map(async (entity) => await this.mapToDto(entity)))
	}
}
