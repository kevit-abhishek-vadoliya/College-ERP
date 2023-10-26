import * as request from "supertest"
import app from '../src/app'
import mongoose from "mongoose"
import dbObj from './db/db'

beforeEach(dbObj.setupDatabase)


describe("getStudents", ()=>{
    test('should get all students to authorized user only',async ()=>{
        await request(app).get('/students')
        .expect(401)
    })
})

describe("addStudent",()=>{
    test('should not add student without authorization', async ()=>{
        await request(app).post('/students/add')
        .expect(401)
    })
})

describe("updateStudent",()=>{
    test('should not update student if not authorized', async ()=>{
        await request(app).patch('/students/update/652fba95d0cb84f127e7b533')
        .send({
            "name": "Abhishek Vadoliya",
            "email": "abhishekvadoliya@gmail.com"
        })
        .expect(401)
    })
})

describe("deleteStudent", ()=>{
    test("should not delete student if not authorized", async ()=>{
        await request(app).delete('/students/delete/652f5b444256f465f71552e5')
        .expect(401)
    })
})

describe("loginStudent", () => {
    test("should login student if exists", async () => {
        await request(app).post('/students/login')
            .send({
                "email": dbObj.studentTwo.email,
                "password": dbObj.studentTwo.password
            })
            .expect(200)
    })
})

describe("loginStudent", () => {
    test("should not login student if wrong password", async () => {
        await request(app).post('/students/login')
            .send({
                "email": dbObj.studentTwo.email,
                "password": "abcd123"
            })
            .expect(401)
    })
})

describe("addStudent", () => {
    test('should add Student with authorization', async () => {
        await request(app).post('/students/add')
            .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
            .send(    {
                "name": "Noah green",
                "phone_number": 8765432109,
                "department": "6530d9700c893eadc04d6817",
                "batchYear": 2020,
                "semester": 6,
                "email": "noahgreen@gmail.com",
                "password": "Password@2023"
            })
            .expect(201)
    })
})

describe('viewStudentProfile', ()=>{
    test("should see Student profile if logged in", async () => {
        await request(app).get('/students/me')
        .set('Authorization', `Bearer ${dbObj.studentTwo.authToken}`)
        .expect(200)
    })
})


describe('updateStudent', ()=>{
    test('should update student if authorized', async ()=>{
        await request(app).patch(`/students/update/${dbObj.studentOneId}`)
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .send({
            "name": "Abhishek Vadoliya",
            "email": "abhishekvadoliya@gmail.com"
        })
        .expect(200)
    })

})

describe("deleteStudent", ()=>{
    test("should delete student if authorized", async ()=>{
        await request(app).delete(`/students/delete/${dbObj.studentOneId}`)
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})

describe("listStudents", ()=>{
    test("should list all students if authorized", async ()=>{
        await request(app).get('/students')
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})

afterAll( async()=>{
    await app.close()
    await mongoose.disconnect()
})