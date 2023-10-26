import * as request from "supertest"
import app from '../src/app'
import mongoose from "mongoose"
import dbObj from './db/db'

beforeEach(dbObj.setupDatabase)


describe("getDepartments", ()=>{
    test('should get all departments to authorized user only',async ()=>{
        await request(app).get('/departments')
        .expect(401)
    })
})

describe("addDepartment",()=>{
    test('should not add department without authorization', async ()=>{
        await request(app).post('/departments/add')
        .expect(401)
    })
})

describe("updateDepartment",()=>{
    test('should not update department if not authorized', async ()=>{
        await request(app).patch('/departments/update/652fba95d0cb84f127e7b533')
        .send({
            "totalStudentsIntake": 150
        })
        .expect(401)
    })
})

describe("deleteDepartment", ()=>{
    test("should not delete deparment if not authorized", async ()=>{
        await request(app).delete('/departments/delete/652f5b444256f465f71552e5')
        .expect(401)
    })
})

describe("addDepartment",()=>{
    test('should add department if authorized', async ()=>{
        await request(app).post('/departments/add')
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .send({
            "department": "Computer Engineering",
            "initial": "CIV",
            "totalStudentsIntake": 60
        })
        .expect(201)
    })
})

describe("getDepartments", ()=>{
    test('should get all departments to authorized user',async ()=>{
        await request(app).get('/departments')
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})

describe('updateDepartment', ()=>{
    test('should update department if admin login',async ()=> {
        await request(app).patch(`/departments/update/${dbObj.departmentOneId}`)
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .send({
            "totalStudentsIntake": 150
        })
        .expect(200)
        
    })
})

describe("deleteDepartment", ()=>{
    test("should delete deparment if authorized", async ()=>{
        await request(app).delete(`/departments/delete/${dbObj.departmentOneId}`)
        .set('Authorization', `Bearer ${dbObj.facultytwo.authToken}`)
        .expect(200)
    })
})


afterAll( async()=>{
    await app.close()
    await mongoose.disconnect()
})