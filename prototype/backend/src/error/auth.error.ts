import { AppError } from './app.error';

export class AuthenticationError extends AppError {
	constructor(message: string) {
		super(message, 401);

		this.name = 'AuthenticationError';
	}
}

export class AuthorizationError extends AppError {
	constructor(message: string) {
		super(message, 403);

		this.name = 'AuthorizationError';
	}
}
