const request = require('supertest')
const {app} = require('../src/api/app.init')
const status = require('http-status')
const configuration = require('../src/api/common/configuration')

describe('Server running test', () => {
    test('Not found route', async () => {
        const response = await request(app.server).get('/')
        
        expect(response.status).toBe(status.NOT_FOUND)
    })

    test('Health check route', async () => {
        const response = await request(app.server).get(`${configuration.api.apiVersion}/health`)

        expect(response.status).toBe(status.OK)
    })
})