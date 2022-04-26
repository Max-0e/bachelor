import { TaskModel, TaskDocument } from '../models/task.model';
import { NotFoundError } from '../error/not-found.error';
import { ITask } from '../interfaces/task.interface';
import projectService from './project.service';
import { TaskDto } from '../interfaces/dtos/taskDto.interface';
import { IProject } from '../interfaces/project.interface';

class UserService {
    public async getTasksByProjectId(projectId: string){
        const project = await projectService.getProjectById(projectId);
        const projectWithTasks: IProject = await project.populate('tasks');
        console.log(projectWithTasks);
        return projectWithTasks.tasks;
    }
	public async getTaskById(taskId: string) {
		const task: TaskDocument | null = await TaskModel.findOne({ _id: taskId });
		if (!task) throw new NotFoundError('This Task does not exists.');

		return task;
	}

	public async createTask(projectId: string, task: ITask) {
        const taskModel = new TaskModel({ ...task });
        const newTask = await taskModel.save();

        const project = await projectService.getProjectById(projectId);
        // project.tasks.push(newTask);
        await project.save();
        
		return newTask;
	}

	public async updateTask(taskId: string, task: ITask) {
        const taskToUpdate = await this.getTaskById(taskId);
        await taskToUpdate.updateOne(task);
        return await taskToUpdate.save();
	}

    public async deleteTaskById(id: string) {
        const task = await this.getTaskById(id);
        return task.delete();
    }

    public mapToDto(task: ITask): TaskDto {
        return {
            id: task._id,
            name: task.name,
            done: task.done
        }
    }
    
    public mapArrayToDtoArray(tasks: ITask[]): TaskDto[]{
        return tasks.map(task => this.mapToDto(task));
    }
}

export default new UserService();
