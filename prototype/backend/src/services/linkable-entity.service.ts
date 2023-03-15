import { Model } from 'mongoose';
import { OrganizationBasedEntity } from 'src/interfaces/organization-based-entity.interface';
import { ConflictError } from '../error/conflict.error';
import { Entity, EntityDocument } from '../interfaces/entity.interface';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import { entityGroupsService } from './entity-groups.service';
import { levelService } from './level.service';
import { OrganizationBasedEntityService } from './organization-based-entity.service';

export abstract class LinkableEntityService<
	T
> extends OrganizationBasedEntityService<LinkableEntity<T>> {
	private readonly EntityGroupsService;
	private readonly LevelService;
	constructor(
		entityModel: Model<Entity<OrganizationBasedEntity<LinkableEntity<T>>>>
	) {
		super(entityModel);
		this.EntityGroupsService = entityGroupsService;
		this.LevelService = levelService;
	}

	async linkEntityToEntityFromOtherHierarchy(
		organizationId: string,
		entityId: string,
		entityIdToLinkTo: string
	) {
		const entity = await this.getOrganizationBasedEntityById(
			organizationId,
			entityId
		);
		if (entity.entityGroupIds.includes(entityIdToLinkTo))
			throw new ConflictError('Entity already linked.');

		const entityToLinkTo = await this.getEntityGroupById(
			organizationId,
			entityIdToLinkTo
		);

		const entityHierarchyLevel = this.isEntityGroup(entity)
			? (await this.LevelService.getEntityById(entity.levelId)).hierarchyLevel
			: -1;
		const entityToLinkToHierarchyLevel = (
			await this.LevelService.getEntityById(entityToLinkTo.levelId)
		).hierarchyLevel;

		if (entityHierarchyLevel === entityToLinkToHierarchyLevel)
			throw new ConflictError(
				'Cannot link 2 entities of the same HierarchyLevel.'
			);
		if (entityHierarchyLevel > entityToLinkToHierarchyLevel)
			throw new ConflictError('Cannot link to entities of lower hierarchy.');

		entity.entityGroupIds.push(entityToLinkTo._id);
		await entity.save();
		return await this.getEntityById(entityId);
	}

	private getEntityGroupById(organizationId: string, entityIdToLinkTo: string) {
		return this.isEntityGroup(this.EntityModel)
			? (this.getOrganizationBasedEntityById(
					organizationId,
					entityIdToLinkTo
			  ) as unknown as EntityDocument<LinkableEntity<IEntityGroup>>)
			: this.EntityGroupsService.getOrganizationBasedEntityById(
					organizationId,
					entityIdToLinkTo
			  );
	}

	private isEntityGroup(
		entity: any
	): entity is EntityDocument<LinkableEntity<IEntityGroup>> {
		return entity.collection.name === 'entitygroups';
	}
}
