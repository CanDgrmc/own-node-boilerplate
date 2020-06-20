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
        console.log({render:{
            app,
            middleware,
            routes,
            services,
            repositories,
            models,
            db,
            lib,
            common,
            config
        }})
        log.success('app-successfully-created')
    }catch(e){

    }
    
}