import Department from './departments.model';
import Student from '../../components/students/students.model';

/**
 * creates new department in DB
 * @param deptObj body of dept object you want to create
 * @returns new created dept
 */
export async function createDept(deptObj) {
	try {
		return await Department.create(deptObj);
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * Lists all the departments in the DB
 * @returns list of Departments
 */
export async function listDept() {
	try {
		return await Department.find();
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * finds a department by Id
 * @param _id id of the department
 * @returns department object
 */
export async function findDeptById(_id) {
	try {
		return await Department.findById(_id);
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * gets yearly analysis of total students
 * @returns array of all years wise total students with branch
 */
export async function getYearWiseAnalysys() {
	try {
		return await Student.aggregate([
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
				},
			},
			{
				$group: {
					_id: {
						branches: '$department',
						batchYear: '$batchYear',
					},
					totalStudents: {
						$sum: 1,
					},
				},
			},
			{
				$group: {
					_id: '$_id.batchYear',
					branches: {
						$push: {
							branch: '$_id.branches',
							branchStudents: '$totalStudents',
						},
					},
				},
			},
			{
				$project: {
					totalStudents: {
						$reduce: {
							input: '$branches',
							initialValue: 0,
							in: {
								$add: ['$$value', '$$this.branchStudents'],
							},
						},
					},
					Year: '$_id',
					_id: 0,
					branches: 1,
				},
			},
			{
				$project: {
					branches: {
						$arrayToObject: {
							$map: {
								input: '$branches',
								as: 'branch',
								in: {
									k: '$$branch.branch',
									v: '$$branch.branchStudents',
								},
							},
						},
					},
					Year: 1,
					totalStudents: 1,
				},
			},
		]);
	} catch (err) {
		throw new Error(err);
	}
}

/**
 *
 * @param batchYear batchyear for filter
 * @param branch branch for filter
 * @returns array of year wise analytics of vacant seats
 */
export async function getVacantSeats(
	batchYear = undefined,
	branch = undefined,
) {
	try {
		const stages: any = [
			{
				$lookup: {
					from: 'departments',
					localField: 'department',
					foreignField: '_id',
					as: 'department',
				},
			},
			{
				$unwind: {
					path: '$department',
				},
			},
			{
				$group: {
					_id: {
						batchYear: '$batchYear',
						department: '$department.initial',
					},
					totalStudents: {
						$sum: 1,
					},
				},
			},
			{
				$lookup: {
					from: 'departments',
					localField: '_id.department',
					foreignField: 'initial',
					as: 'department',
				},
			},
			{
				$unwind: {
					path: '$department',
				},
			},
			{
				$group: {
					_id: {
						batchYear: '$_id.batchYear',
					},
					totalStudents: {
						$sum: '$totalStudents',
					},
					departments: {
						$push: {
							department: '$department.initial',
							totalStudents: '$totalStudents',
							totalStudentsIntake:
								'$department.totalStudentsIntake',
							availableIntake: {
								$subtract: [
									'$department.totalStudentsIntake',
									'$totalStudents',
								],
							},
						},
					},
				},
			},
			{
				$project: {
					batchYear: '$_id.batchYear',
					_id: 0,
					totalStudents: 1,
					totalStudentsIntake: {
						$reduce: {
							input: '$departments',
							initialValue: 0,
							in: {
								$add: ['$$value', '$$this.totalStudentsIntake'],
							},
						},
					},
					availableIntake: {
						$reduce: {
							input: '$departments',
							initialValue: 0,
							in: {
								$add: ['$$value', '$$this.availableIntake'],
							},
						},
					},
					branches: {
						$arrayToObject: {
							$map: {
								input: '$departments',
								as: 'branch',
								in: {
									k: '$$branch.department',
									v: {
										totalStudents: '$$branch.totalStudents',
										totalStudentsIntake:
											'$$branch.totalStudentsIntake',
										availableIntake:
											'$$branch.availableIntake',
									},
								},
							},
						},
					},
				},
			},
		];

		if (branch) {
			stages.splice(2, 0, {
				$match: {
					'department.initial': branch,
				},
			});
		}
		if (batchYear) {
			stages.unshift({
				$match: {
					batchYear: batchYear,
				},
			});
		}
		return await Student.aggregate(stages);
	} catch (err) {
		throw new Error(err);
	}
}
