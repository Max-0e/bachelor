import { ITask } from '@/intefaces/task.interface';
import { LinkableEntityService } from './linkable-entity.service';

class TaskService extends LinkableEntityService<ITask> {}

export const taskService = new TaskService('tasks');
