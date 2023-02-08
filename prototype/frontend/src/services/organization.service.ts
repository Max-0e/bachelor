import { IOrganization } from '@/intefaces/organization.interface';
import { EntityService } from './entity.service';

class OrganizationService extends EntityService<IOrganization> {}

export const organizationService = new OrganizationService('organization');
