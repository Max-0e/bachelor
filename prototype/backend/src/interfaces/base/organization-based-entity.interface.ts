export type IOrganizationBasedEntity = {
	organizationId: string;
};
export type OrganizationBasedEntity<T> = IOrganizationBasedEntity & T;

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization-Based-Entity:
 *       allOf:
 *         - $ref: '#/components/schemas/Entity'
 *         - type: object
 *           required:
 *             - organizationId
 *           properties:
 *             organizationId:
 *               type: string
 *       example:
 *         id: 64142ac00dca0e7f69c7506b
 *         name: organizationBasedEntity
 *         email: A very interesting organizationBasedEntity.
 *         organizationId: 64142ac00dca0e7f69c7506b
 */
