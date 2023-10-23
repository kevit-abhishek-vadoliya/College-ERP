import Student from './students.model';

/**
 * Creates new Student in DB
 * @param studentObj => student Object to be created.
 */
export async function createStudent(studentObj) {
	try {
		return await Student.create(studentObj);
	} catch (err) {
		throw err;
	}
}

/**
 * list all students
 * @returns all studensts list
 */
export async function listStudents() {
	try {
		return await Student.find();
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * find Student by Id
 * @param _id id of the student you want to find
 * @returns student object
 */
export async function findStudentById(_id) {
	try {
		return await Student.findById(_id);
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * finds student by given email address
 * @param email email address of the student you want to find
 * @returns student object
 */
export async function findStudentByEmail(email) {
	try {
		return await Student.findOne({ email });
	} catch (err) {
		throw new Error(err);
	}
}

export async function listAbsentStudents(
	date,
	batchYear = undefined,
	department = undefined,
	semester = undefined,
) {
	try {
		const stages: any = [
			{
				$lookup: {
					from: 'departments',
					localField: 'department',
					foreignField: '_id',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$project: {
					name: 1,
					phone_number: 1,
					batchYear: 1,
					department: '$result.initial',
					attendance: 1,
					semester: 1,
					emailId: 1,
				},
			},
			{
				$match: {
					attendance: {
						date: date,
						present: false,
					},
				},
			},
			{
				$project: {
					name: 1,
					phone_number: 1,
					batchYear: 1,
					semester: 1,
					emailId: 1,
					department: 1,
				},
			},
		];
		if (batchYear) {
			stages.unshift({
				$match: {
					batchYear: batchYear,
				},
			});
		}
		if (department) {
			stages.push({
				$match: {
					department: department,
				},
			});
		}
		if (semester) {
			stages.unshift({
				$match: {
					semester: semester,
				},
			});
		}
		return await Student.aggregate(stages);
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * return all students whose attendance is less than 75%(batchyear, department, semester are optional)
 * @param batchYear batchyear for filter
 * @param department department for filter
 * @param semester semester for filter
 * @returns arrray of all students whose attendance is less than 75%
 */
export async function listLessAttendanceStudents(
	batchYear = undefined,
	department = undefined,
	semester = undefined,
) {
	try {
		const stages: any = [
			{
				$lookup: {
					from: 'departments',
					localField: 'department',
					foreignField: '_id',
					as: 'result',
				},
			},
			{
				$unwind: {
					path: '$result',
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					department: '$result.initial',
					batchYear: 1,
					semester: 1,
					attendance: 1,
				},
			},
			{
				$unwind: {
					path: '$attendance',
				},
			},
			{
				$group: {
					_id: {
						_id: '$_id',
						name: '$name',
						batchYear: '$batchYear',
						semester: '$semester',
					},
					presentDays: {
						$sum: {
							$cond: [
								{
									$eq: ['$attendance.present', true],
								},
								1,
								0,
							],
						},
					},
					totalDays: {
						$count: {},
					},
					department: {
						$first: '$department',
					},
				},
			},
			{
				$project: {
					_id: '$_id._id',
					name: '$_id.name',
					batchYear: '$_id.batchYear',
					semester: '$_id.semester',
					department: 1,
					attendancePercent: {
						$multiply: [
							{
								$divide: ['$presentDays', '$totalDays'],
							},
							100,
						],
					},
				},
			},
			{
				$match: {
					attendancePercent: {
						$lt: 75,
					},
				},
			},
		];
		if (batchYear) {
			stages.unshift({
				$match: {
					batchYear: batchYear,
				},
			});
		}
		if (department) {
			stages.push({
				$match: {
					department: department,
				},
			});
		}
		if (semester) {
			stages.unshift({
				$match: {
					semester: semester,
				},
			});
		}
		return await Student.aggregate(stages);
	} catch (err) {
		throw new Error(err);
	}
}
