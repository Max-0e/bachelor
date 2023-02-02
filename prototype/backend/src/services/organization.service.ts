import { ValidationError } from '../error/validation.error';
import { EntityCreateDto } from '../interfaces/dtos/entityDto.interface';
import { IOrganization } from '../interfaces/organization.interface';
import { OrganizationModel } from '../models/organization.model';
import { EntityService } from './entity.service';

class OrganizationService extends EntityService<IOrganization> {
	constructor() {
		super(OrganizationModel);
	}

	validateEntityCreateDto(entity: EntityCreateDto<IOrganization>): void {
		const errors: string[] = [];
		if (entity.useEpics === undefined) errors.push('useEpics');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}

	validateEntityUpdateDto(entity: EntityCreateDto<IOrganization>): void {
		const errors: string[] = [];
		if (entity.useEpics === undefined) errors.push('useEpics');
		if (!entity.name) errors.push('name');

		if (errors.length > 0) {
			throw new ValidationError(errors.join(',') + ' required.');
		}
	}
}

export const organizationService = new OrganizationService();
