import { model, Schema, SchemaDefinition } from 'mongoose';
import { Entity } from '../interfaces/entity.interface';

export function makeEntityModel<T>(
	entityName: string,
	props: SchemaDefinition<any>
) {
	const definition = {
		name: { type: String, required: true },
		...props,
	};

	const entitySchema = new Schema<Entity<T>>(definition, {
		statics: {
			findByName(name) {
				return this.findOne({ name: name });
			},
		},
	});

	entitySchema.set('toJSON', {
		virtuals: true,
		transform: (doc, converted) => {
			converted.id = doc._id;
			delete converted.__v;
			delete converted._id;
		},
	});

	entitySchema.set('collection', `${entityName.toLowerCase()}s`);

	const entityModel = model<Entity<T>>(entityName, entitySchema);

	return entityModel;
}
