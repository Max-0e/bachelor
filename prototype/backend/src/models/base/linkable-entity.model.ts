import { Schema, SchemaDefinition } from 'mongoose';
import { LinkableEntity } from '../../interfaces/base/linkable-entity.interface';
import { makeOrganizationBasedEntityModel } from './origanization-based-entity.model';

export function makeLinkableEntityModel<T>(
	entityName: string,
	props: SchemaDefinition<any>
) {
	props.entityGroupIds = [{ type: Schema.Types.ObjectId, ref: 'EntityGroup' }];
	return makeOrganizationBasedEntityModel<LinkableEntity<T>>(entityName, props);
}
