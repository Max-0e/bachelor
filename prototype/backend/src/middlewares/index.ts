import { makeDefaultHeadersMiddleware } from './defaultHeadersMiddleware';
import { makeRequestAndResponseLoggingMiddleware } from './makeRequestAndResponseLoggingMiddleware';
import { makeNotFoundMiddleware } from './notFoundMiddleware';
import { makeErrorMiddleware } from './errorMiddleware';

export const middlewares = {
	defaultHeadersMiddleware: makeDefaultHeadersMiddleware(),
	requestAndResponseLoggingMiddleware: makeRequestAndResponseLoggingMiddleware(),
	notFoundMiddleware: makeNotFoundMiddleware(),
	errorMiddleware: makeErrorMiddleware(),
};
