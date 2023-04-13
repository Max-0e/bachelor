export type ILinkableEntity = {
	entityGroupIds: string[];
};
export type LinkableEntity<T> = ILinkableEntity & T;

/**
 * @swagger
 * components:
 *   schemas:
 *     Linkable-Entity:
 *       allOf:
 *         - $ref: '#/components/schemas/Organization-Based-Entity'
 *         - type: object
 *           required:
 *             - entityGroupIds
 *           properties:
 *             entityGroupIds:
 *               type: array
 *               items:
 *                 type: string
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: linkableEntity
 *         email: A very interesting linkableEntity.
 *         organizationId: 64142ac00dca0e7f69c7506b
 *         entityGroupIds: [64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b, 64142ac00dca0e7f69c7506b]
 */
