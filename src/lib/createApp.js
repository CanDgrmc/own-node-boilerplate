"use strict"
const { Log } = require("../common")

module.exports = async ({
    render: {
        layers: {
            server: {
                app
            },
            middlewares,
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
        
        const {configureRoutes} = lib
        const application = await configureRoutes({
            routes,
            app,
            services,
            config,
            common,
            middlewares
        })
        

        application.listen(config.application.port,() => {
            log.success('app-successfully-created')
        })
    }catch(e){
        console.log(e)
    }
    
}