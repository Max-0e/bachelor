import { Document } from 'mongoose';
export interface IEntity {
	_id: string;
	name: string;
	description?: string;
}

export type Entity<T> = IEntity & T;

export type EntityDocument<T> = Document & Entity<T>;

/**
 * @swagger
 * components:
 *   schemas:
 *     Entity:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the entity
 *         name:
 *           type: string
 *           description: The name of the entity
 *         description:
 *           type: string
 *           description: The description of the entity
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: entity
 *         email: A very interesting entity.
 */
