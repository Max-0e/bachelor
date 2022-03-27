import sendResponse from '../utility/sendResponse';
import { Request, Response, NextFunction } from 'express';

export function makeNotFoundMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		return sendResponse.error(res, 404, 'Nothing here');
	};
}
