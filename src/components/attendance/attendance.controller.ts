import { addAttendance } from './attendance.DAL';
import Student from '../../components/students/students.model';
import { findStudentById } from '../../components/students/students.DAL';

class attendanceController {
    async addAttendance(req, res) {
        try {
           const data = addAttendance(req.body);
           if(data){
            res.status(201).send({
                success: true,
                data: { 'status code': 201, data: "filled attendance successfully" },
            })
           }

        } catch (err) {
            res.status(400).send({
                success: false,
                error: { 'status code': 400, message: err },
            });
        }
    }
}

export default attendanceController;
