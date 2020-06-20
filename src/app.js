"use strict"
const express = require('express')
const app = express()
const lib = require('./lib')
const {
    createApp
} = lib
const env = process.env.NODE_ENV || 'dev'
const config = require('./config')[env]
const db = []

const common = require('./common')
const {Log} = common
const run = async  () => {
    await createApp({
        render: {
            layers: {
                server: {
                    app
                },
                middlewares: require('./middlewares'),
                application: {
                    routes: require('./routes'),
                    services: require('./services'),
                },
                db: {
                    repositories: require('./repositories'),
                    models:[], // if needed
                    db
                }
            },
            lib,
            common,
            config
        }
    });
}

const log = new Log({source:'application'})

run().then(()=> {
    log.success(`app is running on ${config.application.port}`)
}).catch( e => {
    log.error(e.message)
})