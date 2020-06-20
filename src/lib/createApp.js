"use strict"
const { Log } = require("../common")

module.exports = ({
    render: {
        layers: {
            server: {
                app
            },
            middleware,
            application: {
                routes,
                services,
            },
            db: {
                repositories,
                models,
                db
            }
        },
        lib,
        common,
        config
    }
}) => {
    
    try{
        const log = new Log({source:'create-app'})
        log.json({render:{
            app:{
                test: 'tttt'
            }
        }})
        log.success('app-successfully-created')
    }catch(e){
        console.log(e)
    }
    
}