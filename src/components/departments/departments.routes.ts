import { Router } from 'express';
import DepartmentsController from './departments.controller';
import authentication from '../../utils/authentication';
import authorization2 from '../../utils/authorization2';

class DepartmentRoute {
	public router: Router;

	departmentsController = new DepartmentsController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//addDept
		this.router.post(
			'/add',
			authentication,
			authorization2,
			this.departmentsController.createDepartment,
		);

		//listAllDepts
		this.router.get(
			'/',
			authentication,
			this.departmentsController.listAllDepartments,
		);

		//update Department details
		this.router.patch(
			'/update/:id',
			authentication,
			authorization2,
			this.departmentsController.updateDepartment,
		);

		//delete Department
		this.router.delete(
			'/delete/:id',
			authentication,
			authorization2,
			this.departmentsController.deleteDepartment,
		);

		//get year wise students analysis(branch wise total students and total students in college)
		this.router.get(
			'/getAnalysis',
			authentication,
			authorization2,
			this.departmentsController.getYearWiseAnalysys,
		);

		//get vacant seats analysis
		this.router.post(
			'/getVacantSeats',
			authentication,
			authorization2,
			this.departmentsController.getVacantSeats,
		);
	}
}
export default new DepartmentRoute().router;
