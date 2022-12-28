import { ITask } from "@/intefaces/task.interface";
import { EntityService } from "./entity.service";

class TaskService extends EntityService<ITask>{
}

export const taskService = new TaskService('tasks');
