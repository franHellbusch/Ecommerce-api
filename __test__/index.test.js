const request = require('supertest')
const {app} = require('../src/api/app.init')
const status = require('http-status')

describe('Server running test', () => {
    test('health check route', async () => {
        const response = await request(app.server).get('/')
        
        expect(response.status).toBe(status.NOT_FOUND)
    })
})