import express, { Application } from 'express';
import cors from 'cors';

import passport from 'passport';

import { makeRouter } from './router';
import { connectDb } from './mongodb/connect';
import { makeSessionStore } from './mongodb/sessionStore';
import { localStrategy } from './passport/localStrategy';
import { makeSerializeUser } from './passport/serializeUser';
import { makeDeserializeUser } from './passport/deserializeUser';

import { middlewares } from './middlewares';

export function makeApp(): Application {
	require('express-async-errors');

	const db = connectDb();

	const app = express();

	app.use(makeSessionStore(db.getClient()));

	app.use(express.json());
	app.use(
		cors({
			origin: 'http://localhost:8080',
			credentials: true,
		})
	);

	app.use(middlewares.requestAndResponseLoggingMiddleware);
	app.use(middlewares.defaultHeadersMiddleware);

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(localStrategy);
	passport.serializeUser(makeSerializeUser());
	passport.deserializeUser(makeDeserializeUser());

	app.use('/api', makeRouter());

	const path = __dirname + '/views/';

	app.use(express.static(path + 'frontend'));

	app.use(middlewares.notFoundMiddleware);
	app.use(middlewares.errorMiddleware);

	return app;
}
