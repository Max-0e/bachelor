import { IInitiative } from '@/interfaces/initiative.interface';
import { Document, Schema, model } from 'mongoose';

const initiativeSchema = new Schema<IInitiative>({
	name: { type: String, required: true },
	projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

initiativeSchema.set('collection', 'initiatives');

export const InitiativeModel = model<IInitiative>('Initiave', initiativeSchema);

export type InitiativeDocument = IInitiative & Document;
