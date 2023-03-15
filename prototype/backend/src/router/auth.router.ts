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
