import { findStudentById, listStudents, createStudent } from "./students.DAL";

class studnetsController{


    /**
     * create new student
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    async createStudent(req, res, next) {
        try{
            const studentObj = req.body
            const student = await createStudent(studentObj)
            res.status(200).send(student)
        }
        catch(err){
            res.status(400).send(err)
        }
    }

    async listAllStudenst(req, res, next ){
        try{
            const students = await listStudents()
            res.status(200).send(students)
        }
        catch(err){
            res.status(400).send(err)
        }

    }

    async deleteStudent(req, res, next){
        try{
            const {_id} = req.params.id
            const student = await findStudentById(_id)
            if(!student){
                res.status(404).send("No Student Found")
            }
            await student.deleteOne()

        }
        catch{

        }
    }


}