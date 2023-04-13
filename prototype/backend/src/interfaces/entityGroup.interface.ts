import { Entity } from './base/entity.interface';
import { LinkableEntity } from './base/linkable-entity.interface';

export interface IEntityGroup {
	levelId: string;
}

export type EntityGroup = Entity<LinkableEntity<IEntityGroup>>;

/**
 * @swagger
 * components:
 *   schemas:
 *     EntityGroup:
 *       allOf:
 *         - $ref: '#/components/schemas/Linkable-Entity'
 *         - type: object
 *           required:
 *             - levelId
 *           properties:
 *             levelId:
 *               type: string
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: linkableEntity
 *         email: A very interesting linkableEntity.
 *         organizationId: 64142ac00dca0e7f69c7506b
 *         levelId: 64142ac00dca0e7f69c7506b
 *         entityGroupIds: [64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b]
 */
