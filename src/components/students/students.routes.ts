import { Router } from 'express'
import StudnetsController from './students.controller';

class StudentRoute {
    public router: Router;

    studentsController = new StudnetsController();

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

        //addStudent
        this.router.post('/add', this.studentsController.createStudent);

        //listAllStudents
        this.router.get('/', this.studentsController.listAllStudents);

        //update Student details
        this.router.patch('/update/:id', this.studentsController.updateStudent);

        //delete Student 
        this.router.delete('/delete/:id', this.studentsController.deleteStudent);
    }
    
}
export default new StudentRoute().router;