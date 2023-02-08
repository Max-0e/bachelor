import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { makeAuthRouter } from './auth.router';
import { makeOrganizationRouter } from './organization.router';

export function makeRouter(): Router {
	const router = Router();

	router.use('/auth', makeAuthRouter());
	router.use('/organization', isAuth, makeOrganizationRouter());

	return router;
}
