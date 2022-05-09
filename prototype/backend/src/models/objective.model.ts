import { IObjective } from '@/interfaces/objective.interface';
import { Document, Schema, model } from 'mongoose';

const objectiveSchema = new Schema<IObjective>({
	name: { type: String, required: true },
	initiatives: [{ type: Schema.Types.ObjectId, ref: 'Initiative' }],
});

objectiveSchema.set('collection', 'objectives');

export const ObjectiveModel = model<IObjective>('Objective', objectiveSchema);

export type ObjectiveDocument = IObjective & Document;
