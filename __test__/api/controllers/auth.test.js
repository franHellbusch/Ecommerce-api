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
        await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/register`)
        .send({
            email: 'emailtest@gmail.com',
            password: 'passwordtest',
            name: 'user',
            lastName: 'test',
            username: 'user test',
            age: 18
        })
        .expect(302)
    })

    test('Should successfully logout user', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/logout`)
        .expect(200)
        
        expect(response.body).toHaveProperty('success', true)
        expect(response.body.message).toBe('Successfully logged out')
    })

    test('Should successfully login user', async () => {
        await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'emailtest@gmail.com',
            password: 'passwordtest'
        })
        .expect(302)
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

    test('Should be a Missing credentials error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'emailtest@gmail.com'
        })
        .expect(400)

        expect(response.body).toHaveProperty('success', false)
        expect(response.body).toHaveProperty('message', 'Missing credentials')
    })

    test('Should be an Invalid Password error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/login`)
        .send({
            email: 'noexiste@mierror.com',
            password: '123'
        })
        .expect(400)

        expect(response.body).toHaveProperty('success', false)
        expect(response.body).toHaveProperty('message', 'Invalid password, must be at least 8 characters')
    })

    test('Should be a User already exist error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/register`)
        .send({
            email: 'emailtest@gmail.com',
            password: 'passwordtest',
        })
        .expect(409)

        expect(response.body).toHaveProperty('message', 'User already exist')
    })

    test('Should a Mongo missing contect error', async () => {
        const response = await request(app.server)
        .post(`${configuration.api.apiVersion}/auth/register`)
        .send({
            email: 'erroremail@gmail.com',
            password: 'passwordtest',
            name: 'user',
            lastName: 'test',
            username: 'user test',
        })
        .expect(400)

        expect(response.body).toHaveProperty('message', 'user validation failed: age: Path `age` is required.')
    })
})