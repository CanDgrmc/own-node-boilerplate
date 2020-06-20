const express = require('express')
const router = express.Router({
    caseSensitive: true
})
module.exports = async (params) => {
    const {
        route
    } = params
    if (Array.isArray(route)) {
        for (let r in route) {

        }
    } else {
        return await configure(params)
    }
}

async function configure({
    route,
    services,
    config,
    common,
    middlewares: {
        authMiddleware,
        validateRequest
    }
}) {
    const {
        method,
        inject,
        path,
        authenticate,
        body,
        handle
    } = route

    if (authenticate) {
        router[method](path, async (req, res, next) => await authMiddleware(req, res, next))
    }

    if (body) {
        router[method](path, async (req, res, next) => await validateRequest(req, res, next, {
            method,
            rules:body
        }))
    }
    router[method](path, async (req, res, next) => await handle(req, res, next, {
        services: requiredServices
    }))
}