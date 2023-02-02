import { ILevel } from '../interfaces/level.interface';
import { levelService } from '../services/level.service';

import { OrganizationBasedEntityController } from './organization-based-entity.controller';

class LevelController extends OrganizationBasedEntityController<ILevel> {
	constructor() {
		super(levelService);
	}
}

export const levelController = new LevelController();
