import { Router } from 'express';
import FacultiesController from './faculties.controller';
import authentication from '../../utils/authentication';
import authorization2 from '../../utils/authorization2';
import authorization from '../../utils/authorization';

class FacultyRoute {
	public router: Router;

	facultiesController = new FacultiesController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//addFaculty
		this.router.post(
			'/add',
			authentication,
			authorization2,
			this.facultiesController.createFaculty,
		);

		//listAllFacultys
		this.router.get(
			'/',
			authentication,
			authorization2,
			this.facultiesController.listAllFaculties,
		);

		//view profile of current logged in faculty
		this.router.get(
			'/me',
			authentication,
			authorization,
			this.facultiesController.viewFacultyProfile,
		);

		//update Faculty details
		this.router.patch(
			'/update/:id',
			authentication,
			authorization2,
			this.facultiesController.updateFaculty,
		);

		//delete Faculty
		this.router.delete(
			'/delete/:id',
			authentication,
			authorization2,
			this.facultiesController.deleteFaculty,
		);

		//login Faculty
		this.router.post('/login', this.facultiesController.loginFaculty);

		//logout Faculty
		this.router.post(
			'/logout',
			authentication,
			this.facultiesController.logoutFaculty,
		);
	}
}
export default new FacultyRoute().router;
