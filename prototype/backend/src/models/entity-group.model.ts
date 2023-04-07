import { Schema } from 'mongoose';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { makeLinkableEntityModel } from './base/linkable-entity.model';

export const EntityGroupModel = makeLinkableEntityModel<IEntityGroup>(
	'EntityGroup',
	{
		levelId: { type: Schema.Types.ObjectId, ref: 'Level' },
	}
);
