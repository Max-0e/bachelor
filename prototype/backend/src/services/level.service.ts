import { ILevel } from '../interfaces/level.interface';
import { makeEntityModel } from '../models/entity.model';
import { EntityService } from './entity.service';

class LevelService extends EntityService<ILevel> {
	constructor() {
		super(
			makeEntityModel('Level', {
				hirarchyLevel: { type: Number, required: true },
			})
		);
	}
}

export const levelService = new LevelService();
