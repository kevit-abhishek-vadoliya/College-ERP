import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken'
import Student from "../../src/components/students/students.model";
import Faculty from "../../src/components/faculty/faculties.model";
import Department from "../../src/components/departments/departments.model";


const departmentOneId = new mongoose.Types.ObjectId()
const departmentOne = {
    "_id": departmentOneId,
    "department": "Civil Engineering",
    "initial": "CIV",
    "totalStudentsIntake": 60
}
const studentOneId = new mongoose.Types.ObjectId()
const studentOne = {
    "_id": studentOneId,
    "name": "Noah White",
    "phone_number": 8765432109,
    "department": departmentOneId,
    "batchYear": 2020,
    "semester": 6,
    "email": "noahwhite@gmail.com",
    "password": "Password@2023",
    "authToken": jwt.sign({ _id: studentOneId }, process.env.JWT_SECRET)
}

const studentTwoId = new mongoose.Types.ObjectId()
const studentTwo = {
    "_id": studentTwoId,
    "name": "Noah Black",
    "phone_number": 8765432109,
    "department": departmentOneId,
    "batchYear": 2020,
    "semester": 6,
    "email": "noahblack@gmail.com",
    "password": "Password@2023",
    "authToken": jwt.sign({ _id: studentTwoId }, process.env.JWT_SECRET)
}

const facultyOneId = new mongoose.Types.ObjectId()
const facultyOne = {
    "_id": facultyOneId,
    "name": "Kunj Vaishnani",
    "department": departmentOneId,
    "role": "Faculty",
    "email": "kunjvaishnani@gmail.com",
    "password": "Password@2023"
}

const facultytwoId = new mongoose.Types.ObjectId()
const facultytwo = {
    "_id": facultytwoId,
    "name": "Keval kankrecha",
    "department": departmentOneId,
    "role": "Admin",
    "email": "kevalKankrecha@gmail.com",
    "password": "Password@2023",
    "authToken": jwt.sign({ _id: facultytwoId }, process.env.JWT_SECRET)
}

const setupDatabase = async () => {
    await Student.deleteMany()
    await Faculty.deleteMany()
    await Department.deleteMany()
    await new Department(departmentOne).save()
    await new Faculty(facultyOne).save()
    await new Faculty(facultytwo).save()
    await new Student(studentOne).save()
    await new Student(studentTwo).save()
}

export default{ 
    departmentOneId, 
    departmentOne, 
    facultyOneId, 
    facultyOne, 
    facultytwoId, 
    facultytwo, 
    studentOneId, 
    studentOne, 
    studentTwoId, 
    studentTwo, 
    setupDatabase }