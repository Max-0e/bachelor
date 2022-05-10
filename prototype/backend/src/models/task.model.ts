import { ITask, Status } from '@/interfaces/task.interface';
import { Document, Schema, model } from 'mongoose';

export const taskSchema = new Schema<ITask>({
	name: { type: String, required: true },
	status: { type: Number, required: true },
});

taskSchema.set('collection', 'tasks');

export const TaskModel = model<ITask>('Task', taskSchema);

export type TaskDocument = ITask & Document;
