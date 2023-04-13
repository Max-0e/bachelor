import { Entity } from './base/entity.interface';

export interface IOrganization {
	useEpics: boolean;
}

export type Level = Entity<IOrganization>;

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       allOf:
 *         - $ref: '#/components/schemas/Entity'
 *         - type: object
 *           required:
 *             - useEpics
 *           properties:
 *             useEpics:
 *               type: boolean
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: organization
 *         email: A very interesting organization.
 *         useEpics: true
 */
