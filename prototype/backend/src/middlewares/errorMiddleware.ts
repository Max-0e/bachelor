import sendResponse from '../utility/sendResponse';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utility/log';

export function makeErrorMiddleware() {
	return (err: Error, req: Request, res: Response, next: NextFunction) => {
		Logger.warn('Uncaught error!');
		Logger.error(err);
		return sendResponse.error(res);
	};
}
