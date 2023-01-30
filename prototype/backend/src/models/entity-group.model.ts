import { IEntityGroup } from '@/interfaces/entityGroup.interface';
import { Schema } from 'mongoose';
import { makeLinkableEntityModel } from './linkable-entity.model';

export const EntityGroupModel = makeLinkableEntityModel<IEntityGroup>(
	'EntityGroup',
	{
		levelId: { type: Schema.Types.ObjectId, ref: 'Level' },
	}
);
