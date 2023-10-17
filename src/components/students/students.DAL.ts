import Student from "./students.model";

/**
 * Creates new Student in DB
 * @param studentObj => student Object to be created.
 */
export async function createStudent(studentObj) {
    try{
        return await Student.create(studentObj)
    }
    catch(err){
        throw new Error(err)
    }
}

/**
 * list all students
 * @returns all studensts list 
 */
export async function listStudents() {
    try{
        return Student.find()
    }
    catch(err){
        throw new Error(err)
    }    
}

/**
 * find Student by Id
 * @param _id id of the student you want to find
 * @returns student object
 */
export async function findStudentById(_id) {
    try{
        return Student.findById(_id)
    }
    catch(err){
        throw new Error(err)
    }
    
}


