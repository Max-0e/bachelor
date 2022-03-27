import { Request, Response, NextFunction } from 'express';
import Logger from '../utility/log';

export function makeRequestAndResponseLoggingMiddleware() {
	return (req: Request, res: Response, next: NextFunction) => {
		const start = Date.now();

		res.on('finish', () => {
			const duration = Date.now() - start;
			Logger.logHttpRequest(
				getMethodEmoji(req.method),
				req.protocol.toUpperCase(),
				req.httpVersion,
				req.method,
				req.originalUrl,
				`from`,
				req.ip,
				'➡️',
				res.statusCode,
				`after`,
				duration,
				`ms`
			);
		});

		return next();
	};
}

function getMethodEmoji(method: string | null) {
	switch (method) {
		case 'POST':
			return '📦';
		case 'GET':
			return '❔';
		case 'PUT':
			return '♻️';
		case 'DELETE':
			return '☠️';
		case 'PATCH':
			return '🪢';
		case 'HEAD':
			return '🧠';
		default:
			return '❌';
	}
}
