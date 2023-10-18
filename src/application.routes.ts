import { Application } from 'express';
import IndexRoute from './index';
import FacultyRoutes from './components/faculty/faculties.routes';
import StudentsRoutes from './components/students/students.routes';
import DepartmentsRoutes from './components/departments/departments.routes';

export default class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use('/', IndexRoute);
		app.use('/students', StudentsRoutes)
		app.use('/faculties', FacultyRoutes)
		app.use('/departments', DepartmentsRoutes)
	}
}