import { ITask, statusEnum } from "../interfaces/task.interface";
import { makeEntityModel } from "../models/entity.model";
import { EntityService } from "./entity.service";

class TasksService extends EntityService<ITask>{
	constructor() {
		super(makeEntityModel('Task', {
			status: { type: String, required: true, enum: statusEnum },
			storyPoints: { type: Number, required: true }
		}));
	}
}

export const taskService = new TasksService();
