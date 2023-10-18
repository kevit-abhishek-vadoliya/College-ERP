import { Router } from 'express'
import DepartmentsController from './departments.controller';

class DepartmentRoute {
    public router: Router;

    departmentsController = new DepartmentsController();

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

        //addDept
        this.router.post('/add', this.departmentsController.createDepartment);

        //listAllDepts
        this.router.get('/', this.departmentsController.listAllDepartments);

        //update Department details
        this.router.patch('/update/:id', this.departmentsController.updateDepartment);

        //delete Department 
        this.router.delete('/delete/:id', this.departmentsController.deleteDepartment);
    }
    
}
export default new DepartmentRoute().router;