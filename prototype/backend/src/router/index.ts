import { Router } from 'express';
import sendResponse from '../utility/sendResponse';
import { isAuth } from '../middlewares/auth';
import { makeAuthRouter } from './auth.router';

export function makeRouter(): Router {
	const router = Router();

	router.use('/auth', makeAuthRouter());
	router.get('/test', isAuth, (req, res) =>
		sendResponse.message(res, 200, 'some secret information')
	);

	return router;
}
