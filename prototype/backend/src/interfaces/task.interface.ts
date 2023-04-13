import { Entity } from './base/entity.interface';
import { LinkableEntity } from './base/linkable-entity.interface';

export interface ITask {
	status: Status;
	storyPoints: number;
	value: number;
}

export type Task = Entity<LinkableEntity<ITask>>;
export const statusEnum = ['open', 'inProgress', 'done'] as const;
export type Status = typeof statusEnum[number];

/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: string
 *       enum:
 *         - open
 *         - inProgress
 *         - done
 *     Task:
 *       allOf:
 *         - $ref: '#/components/schemas/Linkable-Entity'
 *         - type: object
 *           required:
 *             - status
 *             - storyPoints
 *             - value
 *           properties:
 *             status:
 *               $ref: '#/components/schemas/Status'
 *             storyPoints:
 *               type: number
 *             value:
 *               type: number
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: Task
 *         email: A very interesting Task.
 *         organizationId: 64142ac00dca0e7f69c7506b
 *         entityGroupIds: [64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b]
 *         status: inProgress
 *         storyPoints: 5
 *         value: 8
 */
