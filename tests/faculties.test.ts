import * as request from "supertest"
import app from '../src/app'
import mongoose from "mongoose"
import dbObj from './db/db'

beforeEach(dbObj.setupDatabase)

describe("getFaculties", () => {
    test('should get all faculties to authorized user only', async () => {
        await request(app).get('/faculties')
            .expect(401)
    })
})

describe("addFaculty", () => {
    test('should not add faculty without authorization', async () => {
        await request(app).post('/faculties/add')
            .expect(401)
    })
})

describe("updateFaculty", () => {
    test('should not update faculty if not authorized', async () => {
        await request(app).patch('/faculties/update/652fba95d0cb84f127e7b533')
            .send({
                "department": "6530d95b0c893eadc04d6813"
            })
            .expect(401)
    })
})

describe("deleteFaculty", () => {
    test("should not delete faculty if not authorized", async () => {
        await request(app).delete('/faculties/delete/652f5b444256f465f71552e5')
            .expect(401)
    })
})

describe("loginFaculty", () => {
    test("should login faculty if exists", async () => {
        await request(app).post('/faculties/login')
            .send({
                "email": dbObj.facultytwo.email,
                "password": dbObj.facultytwo.password
            })
            .expect(200)
    })
})

describe("loginFaculty", () => {
    test("should not login faculty if wrong password", async () => {
        await request(app).post('/faculties/login')
            .send({
                "email": dbObj.facultytwo.email,
                "password": "abcd123"
            })
            .expect(401)
    })
})

describe("addFaculty", () => {
    test('should add faculty with authorization', async () => {
        await request(app).post('/faculties/add')
            .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
            .send({
                "name": "Dharmik Rathod",
                "department": dbObj.departmentOneId,
                "role": "Faculty",
                "email": "dharmikrathod@gmail.com",
                "password": "Password@2023"
            }   )
            .expect(201)
    })
})


describe('viewFacultyProfile', () => {
    test("should see faculty profile if logged in", async () => {
        await request(app).get('/faculties/me')
            .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
            .expect(200)
    })
})

describe('updateFaculty', () => {
    test('should update faculty if authorized', async () => {
        await request(app).patch(`/faculties/update/${dbObj.facultyOneId}`)
            .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
            .send({
                "name": "Abhishek Vadoliya",
                "email": "abhishekvadoliya@gmail.com"
            })
            .expect(200)
    })

})

describe("deleteFaculty", ()=>{
    test("should delete faculty if authorized", async ()=>{
        await request(app).delete(`/faculties/delete/${dbObj.facultyOneId}`)
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})

describe("listFaculties", ()=>{
    test("should list all faculties if authorized", async ()=>{
        await request(app).get('/faculties')
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})

afterAll(async () => {
    await app.close()
    await mongoose.disconnect()
})