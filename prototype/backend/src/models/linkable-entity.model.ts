import { Schema, SchemaDefinition } from 'mongoose';
import { LinkableEntity } from '../interfaces/linkable-entity.interface';
import { makeEntityModel } from './entity.model';

export function makeLinkableEntityModel<T>(
	entityName: string,
	props: SchemaDefinition<any>
) {
	props.entityGroupIds = [{ type: Schema.Types.ObjectId, ref: 'EntityGroup' }];
	return makeEntityModel<LinkableEntity<T>>(entityName, props);
}
