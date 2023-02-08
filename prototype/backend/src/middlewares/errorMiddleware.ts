import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error/app.error';
import Logger from '../utility/log';
import sendResponse from '../utility/sendResponse';

export function makeErrorMiddleware() {
	return (err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			Logger.warn(err.message);
			return sendResponse.error(res, err.status, err.message);
		} else if (err.name === 'ValidationError') {
			Logger.warn(err.message);
			return sendResponse.error(res, 400, err.message);
		} else if (
			err.name === 'CastError' &&
			err.message.includes('Cast to ObjectId failed')
		) {
			Logger.warn(err.message);
			return sendResponse.error(res, 400, 'Invalid Id-Format.');
		} else {
			Logger.warn('Uncaught error!');
			Logger.error(err);
			return sendResponse.error(res);
		}
	};
}
