import { ITask } from '@/interfaces/task.interface';
import { Document, Schema, model } from 'mongoose';

const taskSchema = new Schema<ITask>({
	name: { type: String, required: true },
	done: { type: Boolean, required: true },
});

taskSchema.set('collection', 'tasks');

export const TaskModel = model<ITask>('Task', taskSchema);

export type TaskDocument = ITask & Document;
