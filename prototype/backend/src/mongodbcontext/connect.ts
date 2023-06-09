import mongoose from 'mongoose';
import {
	DEV_MODE,
	MONGO_DB,
	MONGO_LOCAL_URL,
	MONGO_PASSWORD,
	MONGO_URL,
	MONGO_USER,
} from '../config';
import { createTestUser } from '../seed';
import Logger from '../utility/log';

export function connectDb() {
	const connectionString =
		MONGO_USER && MONGO_PASSWORD && MONGO_URL
			? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}`
			: `mongodb://${MONGO_LOCAL_URL}:27017/${MONGO_DB}`;

	Logger.log(`Connecting to ${connectionString}...`);

	mongoose.set('strictQuery', true);
	mongoose.connect(connectionString);
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		Logger.log('Database connection established', '💾');
		if (DEV_MODE) {
			createTestUser();
		}
	});

	return db;
}
