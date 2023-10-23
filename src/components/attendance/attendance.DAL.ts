import { findStudentById } from '../../components/students/students.DAL';


/**
 * 
 * @param attendanceObj input object of attendance
 * @returns boolean true
 */
export async function addAttendance(attendanceObj) {
	try {
		attendanceObj.map(async (attendance) => {
			const student = await findStudentById(attendance.studentId);

			student.attendance.push({
				date: attendance.date,
				present: attendance.present,
			});
			await student.save();
		});

		return true;
	} catch (err) {
		throw err;
	}
}
