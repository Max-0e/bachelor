import { ITask } from '@/interfaces/task.interface';
import { LinkableEntityService } from './base/linkable-entity.service';

class TaskService extends LinkableEntityService<ITask> {}

export const taskService = new TaskService('tasks');
