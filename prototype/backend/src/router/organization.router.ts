import { organizationController } from '../controller/organization.controller';
import { IOrganization } from '../interfaces/organization.interface';
import { makeEntityRouter } from './base/entity.router';
import { makeEntityGroupsRouter } from './entity-groups-router';
import { makeLevelRouter } from './level.router';
import { makeTasksRouter } from './tasks.router';

export function makeOrganizationRouter() {
	const router = makeEntityRouter<IOrganization>(organizationController);
	router.use('/levels', makeLevelRouter());
	router.use('/tasks', makeTasksRouter());
	router.use('/groups', makeEntityGroupsRouter());
	return router;
}

/**
 * @swagger
 * tags:
 *   name: Organization
 *   description: API for CRUD operations on organizations
 * /organization:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets all organizations
 *     tags: [Organization]
 *     responses:
 *       200:
 *         description: the organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *   post:
 *     security:
 *       - cookieAuth: []
 *     summary: creates a new organization
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - useEpics
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               useEpics:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: the organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 * /organization/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: gets organization by id
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *   put:
 *     security:
 *       - cookieAuth: []
 *     summary: updates organization by id
 *     tags: [Organization]
 *     parameters:
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
 *               - useEpics
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               useEpics:
 *                 type: boolean
 *     responses:
 *       203:
 *         description: the updated organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     summary: deletes an organization and all its related Entities by id
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: deletion of organization successful
 */
