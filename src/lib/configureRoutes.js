const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
module.exports = async ({
    app,
    routes,
    services,
    config,
    common,
    middlewares
}) => {
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    for (let i in routes) {
        const parent = i
        const routeGroup = routes[i]

        const r = await configure({
            routes: routeGroup,
            services,
            config,
            common,
            middlewares
        })
        app.use(parent,r)

    }

    return app
}

async function configure({
    routes,
    services,
    config,
    common,
    middlewares: {
        authMiddleware,
        validateRequest
    }
}) {
    const router = express.Router({
        caseSensitive: true
    })
    
    for(let i in routes){
        const route = routes[i]
        const {
            method,
            inject,
            path,
            authenticate,
            body,
            handle
        } = route
        const requiredServices = {};
        if (authenticate) {
            router[method](path, async (req, res, next) => await authMiddleware(req, res, next))
        }
    
        if (body) {
            router[method](path, async (req, res, next) => await validateRequest(req, res, next, {
                rules:body
            }))
        }
        router[method](path, async (req, res, next) => await handle(req, res, next, {
            services: requiredServices
        }))
    }
    return router

}