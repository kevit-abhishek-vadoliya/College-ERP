import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
	studentId: {
		ref: 'Student',
		type: Schema.Types.ObjectId,
		required: true,
	},
	date: {
		type: Schema.Types.Date,
		required: true,
	},
	present: {
		type: Schema.Types.Boolean,
		required: true,
	},
});

const Attendance = model('Attendance', attendanceSchema);
export default Attendance;
