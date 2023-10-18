import { findStudentById, listStudents, createStudent, findStudentByEmail } from "./students.DAL";
import bcrypt = require('bcryptjs')
import jwt = require('jsonwebtoken')

class StudnetsController {

    /**
     * create new student
     * @param req express request
     * @param res express response
     */
    async createStudent(req, res) {
        try {
            const studentObj = req.body
            const student = await createStudent(studentObj)
            res.status(201).send({ "success": true, "data": { "status code": 201, 'data': student } })
        }
        catch(err) {
            res.status(400).send({ "success": false, "error": { "status code": 400, 'message': err } })
        }
    }

    /**
    * get list of all students
    * @param req express request
    * @param res express response
    */
    async listAllStudents(req, res) {
        try {
            const students = await listStudents()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': students } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }

    }

    async viewStudentProfile(req, res){
        try{
            const _id = req.user._id
            const student = await findStudentById(_id)
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': student } })
        }
        catch(err){
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }

    /**
     * update student
     * @param req express reqest
     * @param res express response
     */
    async updateStudent(req, res) {
        try {
            const _id = req.params.id
            const student = await findStudentById(_id)

            if (!student) {
               return res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "student not found" } })
            }

            for (let field in req.body) {
                student[field] = req.body[field]
            }
            await student.save()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': student } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }

    /**
     * delete a student
     * @param req express request
     * @param res express response
     */
    async deleteStudent(req, res) {
        try {
            const _id = req.params.id
            const student = await findStudentById(_id)
            if (!student) {
                return res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "Student not found" } })
            }
            await student.deleteOne()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': student } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }


    async loginStudent(req,res){
        try{
            const { email, password } = req.body
            
            if(!email||!password){
                return res.status(400).send({"success": false, "error": { "status code": 400, 'message': "Please provide Email and Password"}})
            }
            const student = await findStudentByEmail(email)
            if(!student){
                return res.status(404).send({"success": false, "error": { "status code": 404, 'message': "No such student found"}})
            }
            const match = await bcrypt.compare(password, student.password)
            if(!match){
                return res.status(401).send({"success": false, "error": { "status code": 401, 'message': "invalid credentials"}})
            }
            const token = jwt.sign({_id: student._id, email: student.email}, process.env.JWT_SECRET)

            student.authToken = token
            await student.save()
            res.status(200).send({"success": true, "data": { "status code": 200, 'data': token } })
        }
        catch(err){
            res.status(500).send({"success": false, "error": { "status code": 500, 'message': err } })
        }
    }
}

export default StudnetsController