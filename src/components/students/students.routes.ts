import { Router } from 'express'
import StudnetsController from './students.controller';
import authentication from '../../utils/authentication';
import authorization from '../../utils/authorization';

class StudentRoute {
    public router: Router;

    studentsController = new StudnetsController();

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

        //addStudent
        this.router.post('/add', authentication, authorization, this.studentsController.createStudent);

        //listAllStudents
        this.router.get('/', authentication, authorization, this.studentsController.listAllStudents);

        //view profile of current logged in student
        this.router.get('/me', authentication, this.studentsController.viewStudentProfile)

        //update Student details
        this.router.patch('/update/:id', authentication, this.studentsController.updateStudent);

        //delete Student 
        this.router.delete('/delete/:id', authentication , authorization, this.studentsController.deleteStudent);

        //login Student
        this.router.post('/login', this.studentsController.loginStudent)
    }
    
}
export default new StudentRoute().router;