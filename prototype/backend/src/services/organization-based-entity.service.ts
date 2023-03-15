import { Model } from 'mongoose';
import { NotFoundError } from '../error/not-found.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { Entity, EntityDocument } from '../interfaces/entity.interface';
import { OrganizationBasedEntity } from '../interfaces/organization-based-entity.interface';
import { EntityService } from './entity.service';
import { organizationService } from './organization.service';

export abstract class OrganizationBasedEntityService<T> extends EntityService<
	OrganizationBasedEntity<T>
> {
	organizationService;
	constructor(entityModel: Model<Entity<OrganizationBasedEntity<T>>>) {
		super(entityModel);
		this.organizationService = organizationService;
	}

	public async getOrganizationBasedEntities(
		organizationId: string
	): Promise<EntityDocument<OrganizationBasedEntity<T>>[]> {
		const organization = await this.getOrganizationById(organizationId);
		const entities = await this.getEntities();
		return entities.filter(
			(entity) =>
				entity.organizationId.toString() === organization._id.toString()
		);
	}

	public async getOrganizationBasedEntityById(
		organizationId: string,
		id: string
	): Promise<EntityDocument<OrganizationBasedEntity<T>>> {
		const organization = await this.getOrganizationById(organizationId);
		const entity = await this.EntityModel.findById(id);
		if (
			!entity ||
			// TODO: why do we need .toString()
			entity.organizationId.toString() !== organization._id.toString()
		)
			throw new NotFoundError(
				`Entity with id ${id} does not exists in Organization wth id ${organizationId}.`
			);

		return entity;
	}

	public async createOrganizationBasedEntity(
		organizationId: string,
		entity: EntityCreateDto<T>
	): Promise<EntityDocument<OrganizationBasedEntity<T>>> {
		await this.getOrganizationById(organizationId);
		const newEntity = await this.createEntity({
			organizationId,
			...entity,
		});
		return await this.getOrganizationBasedEntityById(
			organizationId,
			newEntity._id
		);
	}
	public async createMultipleOrganizationBasedEntities(
		organizationId: string,
		entities: EntityCreateDto<T>[]
	): Promise<EntityDocument<OrganizationBasedEntity<T>>[]> {
		await this.getOrganizationById(organizationId);
		const newEntities = await Promise.all(
			entities.map(async (entity) => {
				const newEntity = await this.createEntity({
					organizationId,
					...entity,
				});
				return await this.getOrganizationBasedEntityById(
					organizationId,
					newEntity._id
				);
			})
		);
		return newEntities;
	}

	public async updateOrganizationBasedEntity(
		organizationId: string,
		entityId: string,
		entity: EntityCreateDto<T>
	): Promise<EntityDocument<OrganizationBasedEntity<T>>> {
		await this.getOrganizationBasedEntityById(organizationId, entityId);

		await this.updateEntity(entityId, { organizationId, ...entity });
		return await this.getEntityById(entityId);
	}

	private async getOrganizationById(organizationId: string) {
		return this.organizationService.getEntityById(organizationId);
	}

	public async deleteOrganizationBasedEntityById(
		organizationId: string,
		id: string
	) {
		const entity = await this.getOrganizationBasedEntityById(
			organizationId,
			id
		);
		return entity.delete();
	}
}
