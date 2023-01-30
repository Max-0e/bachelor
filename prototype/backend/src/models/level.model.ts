import { ILevel } from '../interfaces/level.interface';
import { makeEntityModel } from './entity.model';

export const LevelModel = makeEntityModel<ILevel>('Level', {
	hirarchyLevel: { type: Number, required: true },
});
