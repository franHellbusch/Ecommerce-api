require('dotenv').config()

const {app} = require('../../src/api/app.init')

describe('App initialization', () => {
    let server
    beforeAll(() => {
        server = app.listen()
    })

    afterAll(() => {
        server.close()
    })

    test('App port', async () => {
        const port = process.env.PORT || 8080
        expect(app.port).toBe(port)
    })
})