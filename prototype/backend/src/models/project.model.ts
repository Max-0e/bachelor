import { Document, Schema, model } from 'mongoose';
import { IProjectModel } from '../interfaces/project.interface';

const projectSchema = new Schema<IProjectModel>({
	name: { type: String, required: true },
	tasks: [
		{ type: Schema.Types.ObjectId, ref: 'Task' }
	],
});

projectSchema.set('collection', 'projects');

export const ProjectModel = model<IProjectModel>('Project', projectSchema);

export type ProjectDocument = IProjectModel & Document;
