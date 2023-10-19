import {
	findFacultyById,
	listFaculties,
	createFaculty,
	findFacultyByEmail,
} from './faculties.DAL';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');

class FacultiesController {
	/**
	 * Adds new faculty to the DB
	 * @param req express request
	 * @param res express response
	 */
	async createFaculty(req, res) {
		try {
			const facultyObj = req.body;
			const faculty = await createFaculty(facultyObj);
			res.status(201).send({
				success: true,
				data: { 'status code': 201, data: faculty },
			});
		} catch (err) {
			res.status(400).send({
				success: false,
				error: { 'status code': 400, message: err },
			});
		}
	}

	/**
	 * lists all faculty in DB
	 * @param req express request
	 * @param res express response
	 */
	async listAllFaculties(req, res) {
		try {
			const faculties = await listFaculties();
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: faculties },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}

	/**
	 * view profile of currently logged in faculty
	 * @param req express request
	 * @param res express response
	 */
	async viewFacultyProfile(req, res) {
		try {
			const _id = req.user._id;
			const faculty = await findFacultyById(_id);
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: faculty },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}

	/**
	 * updates a faculty in DB
	 * @param req express request
	 * @param res express response
	 */
	async updateFaculty(req, res) {
		try {
			const _id = req.params.id;
			const faculty = await findFacultyById(_id);

			if (!faculty) {
				return res
					.status(404)
					.send({
						success: false,
						error: {
							'status code': 404,
							message: 'faculty not found',
						},
					});
			}

			for (let field in req.body) {
				faculty[field] = req.body[field];
			}
			await faculty.save();
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: faculty },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}

	/**
	 * removes a faculty from DB
	 * @param req express request
	 * @param res express response
	 */
	async deleteFaculty(req, res) {
		try {
			const _id = req.params.id;
			const faculty = await findFacultyById(_id);
			if (!faculty) {
				return res
					.status(404)
					.send({
						success: false,
						error: {
							'status code': 404,
							message: 'Faculty not found',
						},
					});
			}
			await faculty.deleteOne();
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: faculty },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}

	/**
	 * does facultyLogin
	 * @param req express request
	 * @param res express response
	 */
	async loginFaculty(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res
					.status(400)
					.send({
						success: false,
						error: {
							'status code': 400,
							message: 'Please provide Email and Password',
						},
					});
			}
			const faculty = await findFacultyByEmail(email);
			if (!faculty) {
				return res
					.status(404)
					.send({
						success: false,
						error: {
							'status code': 404,
							message: 'No such faculty found',
						},
					});
			}
			const match = await bcrypt.compare(password, faculty.password);
			if (!match) {
				return res
					.status(401)
					.send({
						success: false,
						error: {
							'status code': 401,
							message: 'invalid credentials',
						},
					});
			}
			const token = jwt.sign(
				{ _id: faculty._id, email: faculty.email },
				process.env.JWT_SECRET,
			);

			faculty.authToken = token;
			await faculty.save();
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: token },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}

	/**
	 * logout current session of faculty
	 * @param req express request
	 * @param res express response
	 */
	async logoutFaculty(req, res) {
		try {
			const user = await findFacultyById(req.user._id);
			user.authToken = ' ';
			await user.save();
			res.status(200).send({
				success: true,
				data: { 'status code': 200, data: 'logout Successfull' },
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				error: { 'status code': 500, message: err },
			});
		}
	}
}

export default FacultiesController;
