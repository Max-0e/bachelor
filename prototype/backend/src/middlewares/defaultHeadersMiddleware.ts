import { Request, Response, NextFunction } from 'express';

export function makeDefaultHeadersMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		return next();
	};
}
