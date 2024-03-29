import { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { UserDocument, UserModel } from '../models/user.model';

import mailerService from '../services/mailer.service';
import userService from '../services/user.service';

import { CLIENT_APP_URL } from '../config';
import { AuthorizationError } from '../error/auth.error';
import { NotFoundError } from '../error/not-found.error';
import sendResponse from '../utility/sendResponse';

class AuthController {
	public async login(req: Request, res: Response): Promise<Response> {
		return await sendResponse.data(
			res,
			200,
			userService.mapToDto(req.user as UserDocument)
		);
	}

	public async authorize(req: Request, res: Response): Promise<Response> {
		return await sendResponse.data(
			res,
			200,
			userService.mapToDto(req.user as UserDocument)
		);
	}

	public async logoutUser(req: Request, res: Response): Promise<Response> {
		req.logout(() => {});
		return await sendResponse.message(res, 200, 'logged out');
	}

	public async register(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> {
		const activationToken = uuidV4();

		const user = new UserModel({
			_id: new mongoose.Types.ObjectId(),
			username: req.body.username,
			email: req.body.email,
			pwdHash: bcrypt.hashSync(req.body.password, 10),
			activated: false,
			activationToken: activationToken,
		});
		const config = {
			recipientEmail: req.body.email,
			subject: 'Activate your account',
			text: 'Click on the Link to activate your account.',
			html: `<h4>Finish Registration</h4>
			<p>Click on the Link to activate your account.</p>
			<a href="${CLIENT_APP_URL}/activate/${activationToken}">Confirm E-Mail-Address</a>`,
		};
		await userService.createUser(user);
		mailerService.sendMail(config);
		return await sendResponse.message(
			res,
			200,
			'E-Mail for registration was sent successfully.'
		);
	}

	public async activateUser(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> {
		try {
			await userService.activate(req.body.activationToken as string);
			return await sendResponse.message(
				res,
				200,
				'User was successfully activated.'
			);
		} catch (error) {
			if (error instanceof NotFoundError)
				return sendResponse.error(res, error.status, error.message);
			throw error;
		}
	}

	public async requestPasswordReset(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const user = await userService.findUserByUsernameOrEmail(req.body.email);
			if (user) {
				const resetToken = uuidV4();
				const config = {
					recipientEmail: user.email,
					subject: 'Reset your Password',
					text: 'Click on the Link to reset your password.\n',
					html: `<h4>Password Reset</h4>
					<p>Click on the Link to reset your password. \n
					Your Link will only be active for 2 hours!</p>
					<a href="${CLIENT_APP_URL}/auth/resetPassword/${resetToken}">Reset Password</a>`,
				};
				await userService.requestPasswordReset(user.email, resetToken);
				mailerService.sendMail(config);
			}
		} catch (e: any) {
			if (e.status !== 404) throw e;
		}
		return await sendResponse.message(
			res,
			200,
			'The user with the given E-Mail-Address received his reset Link if he exists.'
		);
	}

	public async resetPassword(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response> {
		const newPwdHash = bcrypt.hashSync(req.body.password, 10);
		const pwdResetToken = req.body.pwdResetToken;
		try {
			await userService.resetPassword(pwdResetToken, newPwdHash);
			return await sendResponse.message(
				res,
				200,
				'Password successfully reset'
			);
		} catch (error) {
			if (error instanceof NotFoundError)
				return sendResponse.error(res, error.status, error.message);
			if (error instanceof AuthorizationError)
				return sendResponse.error(res, error.status, error.message);
			throw error;
		}
	}
}

export default new AuthController();
