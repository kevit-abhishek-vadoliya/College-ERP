import { Router } from 'express';
import AttendanceController from './attendance.controller';
import authentication from '../../utils/authentication';
import authorization from '../../utils/authorization';

class AttendanceRoute {
	public router: Router;

	attendanceController = new AttendanceController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//add attendence
		this.router.post(
			'/addAttendance',
			authentication,
			authorization,
			this.attendanceController.addAttendance,
		);
	}
}
export default new AttendanceRoute().router;
