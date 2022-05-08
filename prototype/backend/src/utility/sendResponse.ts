import { Response } from 'express';

class sendResponse {
	public async message(res: Response, status: number, message: string): Promise<Response> {
		return res.status(status).json({ status, message });
	}

	public async data(res: Response, status: number, payloadJSON: Object): Promise<Response> {
		return res.status(status).json(payloadJSON);
	}

	public async redirect(
		res: Response,
		url: string,
		status: number | undefined = 302
	): Promise<void> {
		return res.redirect(url, status);
	}
	public async error(
		res: Response,
		status: number = 500,
		message: string = 'Internal error'
	): Promise<Response> {
		return res.status(status).json({ status, message });
	}
}

export default new sendResponse();
