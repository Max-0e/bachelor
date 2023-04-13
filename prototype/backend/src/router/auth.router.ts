import Router from 'express';
import passport from 'passport';
import AuthController from '../controller/auth.controller';
import { isAuth } from '../middlewares/auth';

export function makeAuthRouter() {
	const router = Router();

	router.get('/authorize', isAuth, AuthController.authorize);
	router.post('/login', passport.authenticate('local'), AuthController.login);
	router.post('/logout', AuthController.logoutUser);
	router.post('/register', AuthController.register);
	router.post('/activate', AuthController.activateUser);
	router.post('/forgot-password', AuthController.requestPasswordReset);
	router.post('/reset-password/', AuthController.resetPassword);

	return router;
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authorization of the API
 * /auth/authorize:
 *   get:
 *     summary: authorizes the user and updates the session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: the authorization result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /auth/login:
 *   post:
 *     summary: logs in the user and creates a session
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /auth/logout:
 *   post:
 *     summary: logs out the user and deletes the session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout Success.
 *       500:
 *         description: Some server error
 * /auth/register:
 *   post:
 *     summary: created a new user and sends a confirmation email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration success.
 *       500:
 *         description: Some server error
 * /auth/activate:
 *   post:
 *     summary: activates the user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activationToken
 *             properties:
 *               activationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Activation success.
 *       500:
 *         description: Some server error
 * /auth/forgot-password:
 *   post:
 *     summary: sends a password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset Email sent.
 *       500:
 *         description: Some server error
 * /auth/reset-password:
 *   post:
 *     summary: resets a password with the given password and token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - pwdResetToken
 *             properties:
 *               password:
 *                 type: string
 *               pwdResetToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset Password Success.
 *       500:
 *         description: Some server error
 */
