import { IOrganization } from '../interfaces/organization.interface';
import { makeEntityModel } from './base/entity.model';

export const OrganizationModel = makeEntityModel<IOrganization>(
	'Organization',
	{
		useEpics: { type: Boolean, required: true },
	}
);
