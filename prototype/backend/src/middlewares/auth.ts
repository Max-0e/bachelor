import sendResponse from '../utility/sendResponse';
import { RequestHandler } from 'express';

export const isAuth: RequestHandler = (req, res, next) => {
	req.isAuthenticated() ? next() : sendResponse.error(res, 401, 'unauthorized');
};

// export const permit = (permittedRoles :string[]) => {
// 	return (req :Request, res :Response, next :NextFunction) => {
// 	  	const user = req.body.user as IUser;
// 	  	if (user && permittedRoles.includes(user.role)) {
// 			next();
// 		} else {
// 			return res.status(403).json({ message: 'Forbidden' })
// 	  	}
// 	}
// };
