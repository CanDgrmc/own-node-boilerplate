const express = require('express')
const app = express()
const {
    createApp
} = require('./lib')
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
                middleware: require('./middlewares'),
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
            lib: require('./lib'),
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