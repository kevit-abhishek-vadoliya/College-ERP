import Faculty from "./faculties.model";


/**
 * add new faculty
 * @param facultyObj body of faculty object you want to create
 * @returns created faculty
 */
export async function createFaculty(facultyObj) {
    try{
        return await Faculty.create(facultyObj)
    }
    catch(err){
        throw new Error(err)
    }
}

/**
 * lists all faculty in the college
 * @returns list of all faculties
 */
export async function listFaculties() {
    try{
        return Faculty.find()
    }
    catch(err){
        throw new Error(err)
    }    
}


/**
 * finds one faculty by id
 * @param _id id of the faculty
 * @returns faculty data
 */
export async function findFacultyById(_id) {
    try{
        return Faculty.findById(_id)
    }
    catch(err){
        throw new Error(err)
    }
    
}