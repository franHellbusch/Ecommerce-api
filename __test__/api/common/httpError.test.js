const httpStatus = require("http-status")
const { createError } = require("../../../src/api/common/httpError")

describe('httpError create', () => {
    test('Shound be internar error', () => {
        expect(createError(new Error('Shound be internar error')).message).toBe(httpStatus[500])
    })

    test('Should be a normal error', () => {
        expect(createError('', 400).message).toBe(httpStatus[400])
    })
})