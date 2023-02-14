const request = require("supertest")
const { app } = require("../../../src/api/app.init")
const configuration = require("../../../src/api/common/configuration")

describe('Authentication route', () => {
    let server
    beforeAll(() => {
        server = app.listen()
    })

    afterAll(() => {
        server.close()
    })

    test('Should successfully register user', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/register`)
        .send({
            email: 'emailtest@gmail.com',
            password: 'passwordtest',
            name: 'user',
            lastName: 'test',
            username: 'user test',
            age: 18
        })
        .expect(201)

        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('user')
    })

    test('Should successfully logout user', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/logout`)
        .expect(200)
        
        expect(response.body).toHaveProperty('success', true)
        expect(response.body.message).toBe('Successfully logged out')
    })

    test('Should successfully login user', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'emailtest@gmail.com',
            password: 'passwordtest'
        })
        .expect(200)
        
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('user')
    })
})

describe('Authentication route ERROR', () => {
    let server
    beforeAll(() => {
        server = app.listen()
    })

    afterAll(() => {
        server.close()
    })

    test('Should be a bad request error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'emailtest@gmail.com'
        })
        .expect(400)

        expect(response.body).toHaveProperty('success', false)
        expect(response.body).toHaveProperty('message', 'Bad Request')
    })

    test('Should be a Unauthorized error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'noexiste@mierror.com',
            password: '123'
        })
        .expect(401)

        expect(response.body).toHaveProperty('success', false)
        expect(response.body).toHaveProperty('message', 'Unauthorized')
    })
})