"use strict"
const express = require('express')
const app = express()
const lib = require('./lib')
global.fetch = require('node-fetch');

const {
    createApp
} = lib
const env = process.env.PATI_ENV || 'dev'
const config = require('./config')[env]


const AWS = require("aws-sdk");

AWS.config.update(config.awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()


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