import { ValidationError } from '../error/validation.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { ILevel } from '../interfaces/level.interface';
import { LevelModel } from '../models/level.model';
import { EntityService } from './entity.service';

class LevelService extends EntityService<ILevel> {
	constructor() {
		super(LevelModel);
	}

	validateEntityCreateDto(entity: EntityCreateDto<ILevel>): void {
		const errors: string[] = [];
		if (entity.hirarchyLevel === undefined) errors.push('hirarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	validateEntityUpdateDto(entity: EntityCreateDto<ILevel>): void {
		const errors: string[] = [];
		if (entity.hirarchyLevel === undefined) errors.push('hirarchyLevel');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
}

export const levelService = new LevelService();
