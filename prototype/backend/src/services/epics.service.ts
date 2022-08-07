// import { TaskModel, TaskDocument } from '../models/task.model';
// import { NotFoundError } from '../error/not-found.error';
// import { ITask, Status } from '../interfaces/task.interface';
// import projectService from './project.service';
// import { TaskDto } from '../interfaces/dtos/taskDto.interface';
// import { IProject } from '../interfaces/project.interface';
// import { ConflictError } from '../error/conflict.error';

// class EpicService {
// 	public async getAllEpics() {
// 		// const projectModel = await projectService.getProjectById(projectId);
// 		// const project: IProject = await projectService.mapModel(projectModel);
// 		// return project.tasks;
// 	}
// 	public async getEpicsByProjectId(taskId: string) {
// 		// const task: TaskDocument | null = await TaskModel.findOne({ _id: taskId });
// 		// if (!task) throw new NotFoundError('This Task does not exists.');

// 		// return task;
// 	}

// 	public async createTask(projectId: string, task: ITask) {
// 		const taskModel = new TaskModel({ ...task });
// 		const newTask = await taskModel.save();

// 		const project = await projectService.getProjectById(projectId);
// 		project.tasks.push(newTask._id);
// 		await project.save();

// 		return newTask;
// 	}

// 	public async updateTask(taskId: string, task: ITask) {
// 		const taskToUpdate = await this.getTaskById(taskId);
// 		if (taskToUpdate.status !== Status.inProgress && task.status === Status.inProgress)
// 			await this.checkWipLimit(taskId);
// 		await taskToUpdate.updateOne(task);
// 		return await this.getTaskById(taskId);
// 	}

// 	public async deleteTaskById(id: string) {
// 		const task = await this.getTaskById(id);
// 		projectService.removeTaskFromProject(id);
// 		return task.delete();
// 	}

// 	public mapToDto(task: ITask): TaskDto {
// 		return {
// 			id: task._id,
// 			name: task.name,
// 			status: task.status,
// 		};
// 	}

// 	public mapArrayToDtoArray(tasks: ITask[]): TaskDto[] {
// 		return tasks.map((task) => this.mapToDto(task));
// 	}

// 	private async checkWipLimit(taskId: string) {
// 		const projectModel = await projectService.getProjectByTaskId(taskId);
// 		const project = await projectService.mapModel(projectModel);

// 		if (
// 			project.tasks.filter((task) => task.status === Status.inProgress).length === project.wipLimit
// 		)
// 			throw new ConflictError('Wip-Limit reached');
// 	}
// }

// export default new TaskService();
