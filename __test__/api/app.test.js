require('dotenv').config()

const {app, createApp} = require('../../src/api/app.init')
const App = require('../../src/api/app')

describe('App config', () => {
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

describe('App initialization', () => {
    test('Middlewares', async () => {
        const instance = createApp()
        const server = instance.listen()
        expect(server).toBeTruthy()
        server.close()
    })
})