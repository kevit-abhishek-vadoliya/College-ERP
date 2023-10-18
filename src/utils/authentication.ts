import jwt = require('jsonwebtoken')
import { findFacultyById } from '../components/faculty/faculties.DAL'
import { findStudentById } from '../components/students/students.DAL'


export default async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await findFacultyById(decoded._id) === null ? await findStudentById(decoded._id) : await findFacultyById(decoded._id)
        if (!user) {
            throw new Error("please authenticate")
        }
        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send(e)

    }
}
