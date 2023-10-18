import { Router } from 'express'
import FacultiesController from './faculties.controller';

class FacultyRoute {
    public router: Router;

    facultiesController = new FacultiesController();

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(){

        //addFaculty
        this.router.post('/add', this.facultiesController.createFaculty);

        //listAllFacultys
        this.router.get('/', this.facultiesController.listAllFaculties);

        //update Faculty details
        this.router.patch('/update/:id', this.facultiesController.updateFaculty);

        //delete Faculty 
        this.router.delete('/delete/:id', this.facultiesController.deleteFaculty);
    }
    
}
export default new FacultyRoute().router;