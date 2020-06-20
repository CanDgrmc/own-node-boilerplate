"use strict"
module.exports = {
    method: 'get',
    path: '/test',
    authenticate: {
        type: 'user'
    },
    require: ['testService'],
    body: {
        required: true,
        parameters: {
            test: {
                required: true,
                type: 'string'
            }
        }
    },
    handle: async (req, res, next, {
        services: {
            testService
        }
    }) => {
        res.send('HELLO WORLD').end(200)
    }
}