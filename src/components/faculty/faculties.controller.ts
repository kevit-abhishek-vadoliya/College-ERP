import { findFacultyById, listFaculties, createFaculty } from "./faculties.DAL";

class FacultiesController {

    /**
     * Adds new faculty to the DB
     * @param req express request
     * @param res express response
     */
    async createFaculty(req, res) {
        try {
            const facultyObj = req.body
            const faculty = await createFaculty(facultyObj)
            res.status(201).send({ "success": true, "data": { "status code": 201, 'data': faculty } })
        }
        catch (err) {
            res.status(400).send({ "success": false, "error": { "status code": 400, 'message': err } })
        }
    }

    
    /**
     * lists all faculty in DB
     * @param req express request
     * @param res express response
     */
    async listAllFaculties(req, res) {
        try {
            const faculties = await listFaculties()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': faculties } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }


    /**
     * updates a faculty in DB
     * @param req express request
     * @param res express response
     */
    async updateFaculty(req, res) {
        try {
            const _id = req.params.id
            const faculty = await findFacultyById(_id)

            if (!faculty) {
                res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "faculty not found" } })
            }

            for (let field in req.body) {
                faculty[field] = req.body[field]
            }
            await faculty.save()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': faculty } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }

    
    /**
     * removes a faculty from DB
     * @param req express request
     * @param res express response
     */
    async deleteFaculty(req, res) {
        try {
            const _id = req.params.id
            const faculty = await findFacultyById(_id)
            if (!faculty) {
                res.status(404).send({ "success": false, "error": { "status code": 404, 'message': "Faculty not found" } })
            }
            await faculty.deleteOne()
            res.status(200).send({ "success": true, "data": { "status code": 200, 'data': faculty } })
        }
        catch (err) {
            res.status(500).send({ "success": false, "error": { "status code": 500, 'message': err } })
        }
    }
}

export default FacultiesController