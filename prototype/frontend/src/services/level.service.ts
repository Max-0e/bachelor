import { ILevel } from '@/intefaces/level.interface';
import { OrganizationBasedEntityService } from './organization-based-entity.service';

class LevelService extends OrganizationBasedEntityService<ILevel> {}

export const levelService = new LevelService('levels');
