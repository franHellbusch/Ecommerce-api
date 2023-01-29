require('dotenv').config()
const configuration = require('../../../src/api/common/configuration')

describe('Configuration test', () => {
    test('Globals', () => {
        expect(configuration.globals.env).toBe('test')
    })

    test('Greeting message', () => {
        expect(configuration.api.greeting()).toBe(`Server up and running in port: ${configuration.globals.port}`)
    })
})