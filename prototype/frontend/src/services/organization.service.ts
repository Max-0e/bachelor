import { IOrganization } from '@/interfaces/organization.interface';
import { EntityService } from './base/entity.service';

class OrganizationService extends EntityService<IOrganization> {}

export const organizationService = new OrganizationService('organization');
