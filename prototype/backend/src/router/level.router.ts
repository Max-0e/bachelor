import { levelController } from '../controller/level.controller';
import { ILevel } from '../interfaces/level.interface';
import { makeOrganizationBasedEntityRouter } from './base/organization-based-entity.router';

export function makeLevelRouter() {
	return makeOrganizationBasedEntityRouter<ILevel>(levelController);
}

/**
 * @swagger
 * tags:
 *   name: Level
 *   description: API for CRUD operations on levels
 * /organization/levels/{organizationId}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets all levels in the organization
 *     tags: [Level]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the levels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Level'
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: creates a new level in the organization
 *     tags: [Level]
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
 *               - hierarchyLevel
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               hierarchyLevel:
 *                 type: number
 *     responses:
 *       201:
 *         description: the level
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Level'
 * /organization/levels/{organizationId}/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets level in organization by id
 *     tags: [Level]
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
 *         description: the level
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Level'
 *   put:
 *     security:
 *       - cookieAuth: []
 *     summary: updates level in organization by id
 *     tags: [Level]
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
 *               - hierarchyLevel
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               hierarchyLevel:
 *                 type: number
 *     responses:
 *       203:
 *         description: the updated level
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Level'
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     summary: deletes a level and all its related Entities by id
 *     tags: [Level]
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
 *         description: deletion of level successful
 */
