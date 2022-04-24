import MongoStore from 'connect-mongo';
import session from 'express-session';
import { MongoClient } from 'mongodb';
import { SECRET } from '../config';

export function makeSessionStore(mongoClient: MongoClient) {
	const options = {
		client: mongoClient,
		collectionName: 'sessions',
		ttl: 1000 * 60 * 60 * 24,
	};

	return session({
		secret: SECRET,
		store: MongoStore.create(options),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
	});
}
