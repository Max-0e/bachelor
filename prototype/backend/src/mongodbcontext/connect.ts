import mongoose from 'mongoose';
import Logger from '../utility/log';

import { MONGO_URL, MONGO_DB, MONGO_USER, MONGO_PASSWORD } from '../config';

export function connectDb() {
	const connectionString =
		MONGO_USER && MONGO_PASSWORD && MONGO_URL
			? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}`
			: `mongodb://localhost:27017/${MONGO_DB}`;

	Logger.log(`Connecting to ${connectionString}...`);

	mongoose.connect(connectionString);
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		Logger.log('Database connection established', '💾');
	});

	return db;
}
