import { AES, enc } from 'crypto-js';
import { Request, Response } from 'express';
import { SECRET } from '../config';
import { AuthorizationError } from '../error/auth.error';
import { ValidationError } from '../error/validation.error';
import { UserDocument } from '../models/user.model';
import { JiraApiService } from '../services/jira-api.service';
import userService from '../services/user.service';
import sendResponse from '../utility/sendResponse';

class JiraController {
	public async getProjects(req: Request, res: Response): Promise<Response> {
		const service = makeJiraService(req.user as UserDocument);
		const project = await service.getProjects();
		return await sendResponse.data(res, 200, project);
	}

	public async addJiraAPIToken(req: Request, res: Response): Promise<Response> {
		const user = req.user as UserDocument;
		const { token, domain, mail } = req.body;
		if (!token || !domain || !mail)
			throw new ValidationError('Token, Mail and Domain required.');

		user.jiraApiToken = AES.encrypt(token, SECRET).toString();
		user.jiraApiDomain = domain;
		user.jiraApiMail = mail;

		await user.save();

		return await sendResponse.data(res, 200, userService.mapToDto(user));
	}

	public async deleteJiraAPIToken(
		req: Request,
		res: Response
	): Promise<Response> {
		const user = req.user as UserDocument;
		user.jiraApiToken = undefined;
		user.jiraApiDomain = undefined;
		user.jiraApiMail = undefined;
		await user.save();

		return await sendResponse.data(res, 200, userService.mapToDto(user));
	}
}

const makeJiraService = (user: UserDocument) => {
	if (
		!user ||
		!user?.jiraApiDomain ||
		!user?.jiraApiToken ||
		!user?.jiraApiMail
	) {
		throw new AuthorizationError('No Jira connection.');
	}
	return new JiraApiService(
		AES.decrypt(user.jiraApiToken, SECRET).toString(enc.Utf8),
		user.jiraApiDomain,
		user.jiraApiMail
	);
};

export const jiraController = new JiraController();
