import { Document, Schema, model } from 'mongoose';
import { IProject } from '../interfaces/project.interface';

const projectSchema = new Schema<IProject>({
	name: { type: String, required: true },
	tasks: 
		[{
			//   _id: false, // Entstanden durch den Fehler, dass mongoose automatisch für ein Objekt an dieser Stelle eine _id erstellt hat
			task: { type: Schema.Types.ObjectId, ref: 'Task' },
		}],
});

projectSchema.set('collection', 'projects');

export const ProjectModel = model<IProject>('Project', projectSchema);

export type ProjectDocument = IProject & Document;
