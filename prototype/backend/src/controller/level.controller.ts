import { ILevel } from '../interfaces/level.interface';
import { levelService } from '../services/level.service';

import { EntityController } from './entity.controller';

class LevelController extends EntityController<ILevel> {
    constructor() {
        super(levelService);
    }
}

export const levelController = new LevelController();
