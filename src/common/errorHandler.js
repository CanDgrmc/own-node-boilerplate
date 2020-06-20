// const applicationErrors = require('./errorCodes/applicationErrors') 
const applicationErrors = []
function validationError(message){
    return {
        json:{
            message
        },
        statusCode: 400
    }
}

function handleError(message){
    if(applicationErrors[message]){
        return {
            statusCode: 500,
            response:{
                success: 'error',
                message: applicationErrors[message]
            }
        }
    }else{
        return {
            statusCode : 500,
            response: {
                success: 'error',
                message: 'invalid-error'
            }
        }
    }
}
module.exports = {
    validationError,
    handleError
}