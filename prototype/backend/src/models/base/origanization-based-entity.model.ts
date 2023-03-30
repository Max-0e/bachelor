import { Schema, SchemaDefinition } from 'mongoose';
import { OrganizationBasedEntity } from '../../interfaces/base/organization-based-entity.interface';
import { makeEntityModel } from './entity.model';

export function makeOrganizationBasedEntityModel<T>(
	entityName: string,
	props: SchemaDefinition<any>
) {
	props.organizationId = { type: Schema.Types.ObjectId, ref: 'Organization' };
	return makeEntityModel<OrganizationBasedEntity<T>>(entityName, props);
}
