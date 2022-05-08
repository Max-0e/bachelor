import sendResponse from '../utility/sendResponse';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utility/log';
import { AppError } from '../error/app.error';

export function makeErrorMiddleware() {
	return (err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			Logger.warn(err.message);
			return sendResponse.error(res, err.status, err.message);
		} else {
			Logger.warn('Uncaught error!');
			Logger.error(err);
			return sendResponse.error(res);
		}
	};
}
