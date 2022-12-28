import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { makeAuthRouter } from './auth.router';
import { makeEntityGroupsRouter } from './entity-groups-router';
import { makeLevelRouter } from './level.router';
import { makeTasksRouter } from './tasks.router';

export function makeRouter(): Router {
	const router = Router();

	router.use('/auth', makeAuthRouter());
	router.use('/tasks', isAuth, makeTasksRouter());
	router.use('/groups', isAuth, makeEntityGroupsRouter());
	router.use('/level', isAuth, makeLevelRouter());

	return router;
}
