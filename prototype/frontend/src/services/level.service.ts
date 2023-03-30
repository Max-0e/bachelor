import { ILevel } from '@/interfaces/level.interface';
import { OrganizationBasedEntityService } from './base/organization-based-entity.service';

class LevelService extends OrganizationBasedEntityService<ILevel> {}

export const levelService = new LevelService('levels');
