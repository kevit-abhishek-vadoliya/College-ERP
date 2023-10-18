import Department from "./departments.model";

/**
 * creates new department in DB
 * @param deptObj body of dept object you want to create
 * @returns new created dept
 */
export async function createDept(deptObj) {
    try{
        return await Department.create(deptObj)
    }
    catch(err){
        throw new Error(err)
    }
}


/**
 * Lists all the departments in the DB
 * @returns list of Departments
 */
export async function listDept() {
    try{
        return await Department.find()
    }
    catch(err){
        throw new Error(err)
    }    
}


/**
 * finds a department by Id
 * @param _id id of the department
 * @returns department object
 */
export async function findDeptById(_id) {
    try{
        return await Department.findById(_id)
    }
    catch(err){
        throw new Error(err)
    }
}