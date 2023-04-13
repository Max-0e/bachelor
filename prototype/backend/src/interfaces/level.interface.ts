import { Entity } from './base/entity.interface';

export interface ILevel {
	hierarchyLevel: number;
}

export type Level = Entity<ILevel>;

/**
 * @swagger
 * components:
 *   schemas:
 *     Level:
 *       allOf:
 *         - $ref: '#/components/schemas/Organization-Based-Entity'
 *         - type: object
 *           required:
 *             - hierarchyLevel
 *           properties:
 *             hierarchyLevel:
 *               type: number
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: level
 *         email: A very interesting level.
 *         organizationId: 64142ac00dca0e7f69c7506b
 *         hierarchyLevel: 2
 */
