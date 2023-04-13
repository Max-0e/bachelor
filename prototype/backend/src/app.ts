import cors from 'cors';
import express, { Application } from 'express';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import passport from 'passport';

import { connectDb } from './mongodbcontext/connect';
import { makeSessionStore } from './mongodbcontext/sessionStore';
import { makeDeserializeUser } from './passport/deserializeUser';
import { localStrategy } from './passport/localStrategy';
import { makeSerializeUser } from './passport/serializeUser';
import { makeRouter } from './router';

import { middlewares } from './middlewares';
import { swaggerOptions } from './swagger-options';

export function makeApp(): Application {
	require('express-async-errors');

	const db = connectDb();

	const app = express();

	app.use(
		'/api-docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerJsdoc(swaggerOptions))
	);

	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ limit: '50mb' }));

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
