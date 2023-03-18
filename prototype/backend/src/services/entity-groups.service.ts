import { ValidationError } from '../error/validation.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { EntityGroupModel } from '../models/entity-group.model';
import { LinkableEntityService } from './linkable-entity.service';

class EntityGroupsService extends LinkableEntityService<IEntityGroup> {
	constructor() {
		super(EntityGroupModel);
	}

	validateEntityCreateDto(entity: EntityCreateDto<IEntityGroup>): void {
		const errors: string[] = [];
		if (!entity.levelId) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	validateEntityUpdateDto(entity: EntityCreateDto<IEntityGroup>): void {
		const errors: string[] = [];
		if (!entity.levelId) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
}

export const entityGroupsService = new EntityGroupsService();
