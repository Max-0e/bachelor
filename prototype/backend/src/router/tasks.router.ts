import { tasksController } from '../controller/tasks.controller';
import { ITask } from '../interfaces/task.interface';
import { makeLinkableEntityRouter } from './base/linkable-entity.router';

export function makeTasksRouter() {
	const router = makeLinkableEntityRouter<ITask>(tasksController);

	return router;
}

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API for CRUD operations on tasks
 * /organization/tasks/{organizationId}:
 *   get:
 *     summary: gets all tasks in the organization
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: creates a new task in the organization
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - entityGroupIds
 *               - status
 *               - storyPoints
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               entityGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 $ref: '#/components/schemas/Status'
 *               storyPoints:
 *                 type: number
 *               value:
 *                 type: number
 *     responses:
 *       201:
 *         description: the task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 * /organization/tasks/{organizationId}/multiple:
 *   post:
 *     summary: creates multiple new tasks in the organization
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - description
 *                 - entityGroupIds
 *                 - status
 *                 - storyPoints
 *                 - value
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 entityGroupIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                 status:
 *                   $ref: '#/components/schemas/Status'
 *                 storyPoints:
 *                   type: number
 *                 value:
 *                   type: number
 *     responses:
 *       201:
 *         description: the group
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 * /organization/tasks/{organizationId}/link/{entityId}/{entityToLinkToId}:
 *   post:
 *     summary: links an entity to another entity in another hierarchy
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: entityId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: entityToLinkToId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the updated Task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 * /organization/tasks/{organizationId}/{id}:
 *   get:
 *     summary: gets task in organization by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *   put:
 *     summary: updates task in organization by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - entityGroupIds
 *               - status
 *               - storyPoints
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               entityGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 $ref: '#/components/schemas/Status'
 *               storyPoints:
 *                 type: number
 *               value:
 *                 type: number
 *     responses:
 *       203:
 *         description: the updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *   delete:
 *     summary: deletes a task and all its related Entities by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: deletion of group successful
 */
