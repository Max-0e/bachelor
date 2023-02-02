import { IOrganization } from '../interfaces/organization.interface';
import { organizationService } from '../services/organization.service';
import { EntityController } from './entity.controller';

class OrganizationController extends EntityController<IOrganization> {
	constructor() {
		super(organizationService);
	}
}

export const organizationConroller = new OrganizationController();
