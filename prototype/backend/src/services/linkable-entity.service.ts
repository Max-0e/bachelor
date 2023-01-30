import { Model } from 'mongoose';
import { ConflictError } from '../error/conflict.error';
import { Entity, EntityDocument } from '../interfaces/entity.interface';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import { ITask } from '../interfaces/task.interface';
import { entityGroupsService } from './entity-groups.service';
import { EntityService } from './entity.service';
import { levelService } from './level.service';

export abstract class LinkableEntityService<T> extends EntityService<
	LinkableEntity<T>
> {
	private readonly EntityGroupsService;
	private readonly LevelService;
	constructor(entityModel: Model<Entity<LinkableEntity<T>>>) {
		super(entityModel);
		this.EntityGroupsService = entityGroupsService;
		this.LevelService = levelService;
	}

	async linkEntityToEntityFromOtherHirarchy(
		entityId: string,
		entityIdToLinkTo: string
	) {
		const entity = await this.getEntityById(entityId);
		const entityToLinkTo = await this.getEntityGroupById(entityIdToLinkTo);

		const entityHirarchyLevel = this.isEntityGroup(entity)
			? (await this.LevelService.getEntityById(entity.levelId)).hirarchyLevel
			: -1;
		const entitytoLinkToHirachyLevel = (
			await this.LevelService.getEntityById(entityToLinkTo.levelId)
		).hirarchyLevel;

		if (entityHirarchyLevel === entitytoLinkToHirachyLevel)
			throw new ConflictError(
				'Cannot link 2 entities of the same hirarchylevel.'
			);
		if (entityHirarchyLevel > entitytoLinkToHirachyLevel)
			throw new ConflictError('Cannot link to entities of lower hirarchy.');

		entity.entityGroupIds.push(entityToLinkTo._id);
		await entity.save();
		return await this.getEntityById(entityId);
	}

	private getEntityGroupById(entityIdToLinkTo: string) {
		return this.isEntityGroup(this.EntityModel)
			? (this.getEntityById(entityIdToLinkTo) as unknown as EntityDocument<
					LinkableEntity<IEntityGroup>
			  >)
			: this.EntityGroupsService.getEntityById(entityIdToLinkTo);
	}

	private isTask(entity: any): entity is EntityDocument<LinkableEntity<ITask>> {
		return entity.collection.name === 'tasks';
	}

	private isEntityGroup(
		entity: any
	): entity is EntityDocument<LinkableEntity<IEntityGroup>> {
		return entity.collection.name === 'entitygroups';
	}
}
