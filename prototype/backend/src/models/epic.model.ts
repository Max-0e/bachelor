import { Document, Schema, model } from 'mongoose';
import { IEpic } from '../interfaces/epic.interface';

const epicSchema = new Schema<IEpic>({
	name: { type: String, required: true },
	projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

epicSchema.set('collection', 'epics');

export const EpicModel = model<IEpic>('Epic', epicSchema);

export type EpicDocument = IEpic & Document;
