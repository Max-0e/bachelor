import { entityGroupsController } from '../controller/entity-groups.controller';
import { IEntityGroup } from '../interfaces/entityGroup.interface';
import { makeLinkableEntityRouter } from './base/linkable-entity.router';

export function makeEntityGroupsRouter() {
	return makeLinkableEntityRouter<IEntityGroup>(entityGroupsController);
}

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: API for CRUD operations on entity groups
 * /organization/groups/{organizationId}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets all groups in the organization
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EntityGroup'
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: creates a new group in the organization
 *     tags: [Group]
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
 *               - levelId
 *               - entityGroupIds
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               levelId:
 *                 type: string
 *               entityGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: the group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntityGroup'
 * /organization/groups/{organizationId}/multiple:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: creates multiple new groups in the organization
 *     tags: [Group]
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
 *                 - levelId
 *                 - entityGroupIds
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 levelId:
 *                   type: string
 *                 entityGroupIds:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       201:
 *         description: the group
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EntityGroup'
 * /organization/groups/{organizationId}/link/{entityId}/{entityToLinkToId}:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: links an entity to another entity in another hierarchy
 *     tags: [Group]
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
 *         description: the updated group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntityGroup'
 * /organization/groups/{organizationId}/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets group in organization by id
 *     tags: [Group]
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
 *         description: the group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntityGroup'
 *   put:
 *     security:
 *       - cookieAuth: []
 *     summary: updates group in organization by id
 *     tags: [Group]
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
 *               - levelId
 *               - entityGroupIds
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               levelId:
 *                 type: string
 *               entityGroupIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       203:
 *         description: the updated group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntityGroup'
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     summary: deletes a group and all its related Entities by id
 *     tags: [Group]
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
