import Attendance from './attendance.model';

export async function addAttendance(attendanceObj) {
	try {
		return await Attendance.create(attendanceObj);
	} catch (err) {
		throw err;
	}
}
