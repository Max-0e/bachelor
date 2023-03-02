import mongoose from 'mongoose';
import Logger from '../utility/log';

import {
	MONGO_DB,
	MONGO_LOCAL_URL,
	MONGO_PASSWORD,
	MONGO_URL,
	MONGO_USER,
} from '../config';

export function connectDb() {
	const connectionString =
		MONGO_USER && MONGO_PASSWORD && MONGO_URL
			? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}`
			: `mongodb://${MONGO_LOCAL_URL}:27017/${MONGO_DB}`;

	Logger.log(`Connecting to ${connectionString}...`);

	mongoose.connect(connectionString);
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		Logger.log('Database connection established', '💾');
	});

	return db;
}
