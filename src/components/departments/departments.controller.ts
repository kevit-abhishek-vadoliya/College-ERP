import { findDeptById, listDept, createDept } from "./departments.DAL";
import { ObjectId } from 'mongodb'

class DepartmentsController {

    /**
     * Adds new department to the DB
     * @param req express request
     * @param res express response
     */
    async createDepartment(req, res) {
        try {
            const departmentObj = req.body
            console.log(req.body)

            const department = await createDept(departmentObj)
            res.status(201).send({ "success": true, "data": { "status code": 201, 'data': department } })
        }
        catch (err) {
            res.status(400).send({ "success": false, "error": { "status code": 400, 'message': err } })
        }
    }

    
    /**
     * lists all department in DB
     * @param req express request
     * @param res express response
     */
    async listAllDepartments(req, res) {
        try {
            const departments = await listDept()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': departments } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }


    /**
     * updates a department in DB
     * @param req express request
     * @param res express response
     */
    async updateDepartment(req, res) {
        try {
            const _id = req.params.id
            const department = await findDeptById(_id)

            if (!department) {
                res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "department not found" } })
            }

            for (let field in req.body) {
                department[field] = req.body[field]
            }
            await department.save()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': department } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }

    
    /**
     * removes a department from DB
     * @param req express request
     * @param res express response
     */
    async deleteDepartment(req, res) {
        try {
            const id = req.params.id
            const department = await findDeptById(id)
            if (!department) {
                res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "Department not found" } })
            }
            await department.deleteOne()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': department } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }
}

export default DepartmentsController