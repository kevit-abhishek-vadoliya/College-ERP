import { addAttendance } from './attendance.DAL';
import Student from '../../components/students/students.model';

class attendanceController {
    async addAttendance(req, res) {
        try {
            const attendanceObj = req.body;
            const students = await Student.find()
            const updated = students.map((student) => {
                const matchingAttendance = students.find(student => student._id === attendanceObj.studentId)

                if (matchingAttendance) {
                    student.attendance.push(matchingAttendance)
                }
                return student
            })

            console.log(updated)
            // const attendance = await addAttendance(attendanceObj);
            // res.status(201).send({
            // 	success: true,
            // 	data: { 'status code': 201, data: attendance },
            // });

        } catch (err) {
            res.status(400).send({
                success: false,
                data: { 'status code': 400, message: err },
            });
        }
    }
}

export default attendanceController;
