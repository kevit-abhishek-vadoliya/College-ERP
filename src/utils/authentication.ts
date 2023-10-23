import jwt = require('jsonwebtoken');
import { findFacultyById } from '../components/faculty/faculties.DAL';
import { findStudentById } from '../components/students/students.DAL';

/**
 * Middleware to verify token and User from DB
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */
export default async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user =
			(await findFacultyById(decoded._id)) === null
				? await findStudentById(decoded._id)
				: await findFacultyById(decoded._id);
		if (!user) {
			throw 'please authenticate';
		}
		if (user.authToken === token) {
			req.token = token;
			req.user = user;
			next();
		} else {
			throw 'please authenticate';
		}
	} catch (e) {
		res.status(401).send({
			success: false,
			error: { 'status code': 401, message: e },
		});
	}
};
