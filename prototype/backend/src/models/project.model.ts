import { Document, Schema, model } from 'mongoose';
import { IProject } from '../interfaces/project.interface';

const projectSchema = new Schema<IProject>({
	name: { type: String, required: true },
});

projectSchema.set('collection', 'projects');

export const ProjectModel = model<IProject>('Project', projectSchema);

export type ProjectDocument = IProject & Document;
