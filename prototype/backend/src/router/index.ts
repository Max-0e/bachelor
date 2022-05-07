import { Router } from 'express';
import sendResponse from '../utility/sendResponse';
import { isAuth } from '../middlewares/auth';
import { makeAuthRouter } from './auth.router';
import { makeProjectsRouter } from './projects.router';
import { makeTasksRouter } from './tasks.router';

export function makeRouter(): Router {
	const router = Router();

	router.use('/auth', makeAuthRouter());
	router.use('/projects', isAuth, makeProjectsRouter());
	router.use('/tasks', isAuth, makeTasksRouter());
	// router.get('/test', isAuth, (req, res) =>
	// 	sendResponse.message(res, 200, 'some secret information')
	// );

	return router;
}
