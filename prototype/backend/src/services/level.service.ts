import { ValidationError } from '../error/validation.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { ILevel } from '../interfaces/level.interface';
import { LevelModel } from '../models/level.model';
import { OrganizationBasedEntityService } from './organization-based-entity.service';

class LevelService extends OrganizationBasedEntityService<ILevel> {
	constructor() {
		super(LevelModel);
	}

	validateEntityCreateDto(entity: EntityCreateDto<ILevel>): void {
		const errors: string[] = [];
		if (entity.hierarchyLevel === undefined) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	validateEntityUpdateDto(entity: EntityCreateDto<ILevel>): void {
		const errors: string[] = [];
		if (entity.hierarchyLevel === undefined) errors.push('hierarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
}

export const levelService = new LevelService();
