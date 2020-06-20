"use strict"
const {
    dataTypeValidation,
    errorHandler:{
        validationError
    }
} = require('../common')
module.exports = ({
    req,
    res,
    next,
    rules
}) => {
    if (rules == undefined) {
        next()
    }

    switch (req.method) {
        case 'get':
            try{
                validateByRules(req.query, rules.parameters)
                next()
            }catch(e){
                const {
                    json,
                    statusCode
                } = validationError(e.message)
                return res.status(statusCode).json(json).end()
            }
            
            break
        case 'post':
            try {
                validateByRules(req.body, rules.parameters)
            } catch (e) {
                const {
                    json,
                    statusCode
                } = validationError(e.message)

                return res.status(statusCode).json(json).end()
            }

            next()
            break
        case 'PUT':
            break;
        case 'DELETE':
            break
    }

}

function validateByRules(params, rules) {
    for (let i in rules) {
        const {
            required,
            type,
            max,
            maxLength,
            min,
            minLength,
        } = rules[i]
        const param = params[i]

        if (required && param == undefined) {
            throw new Error(`${i} is required`)
        } else if (!required && param == undefined) {
            continue
        }
        switch (type) {
            case 'string':
                dataTypeValidation.assert.isString(param)
                break
            case 'numeric':
                dataTypeValidation.assert.isNumeric(param)
                break
            case 'uuid':
                dataTypeValidation.assert.isUUID(param)
                break;
            case 'email':
                dataTypeValidation.assert.isEmail(param)
                break;
            default:
                throw new Error('type-is-not-defined')
        }

        if (max) {
            dataTypeValidation.assert.numberMaxValue(param, max)
        }

        if (min) {
            dataTypeValidation.assert.numberMinValue(param, min)
        }

        if (maxLength) {
            dataTypeValidation.assert.stringEqualOrLess(param, maxLength)
        }

        if (minLength) {
            dataTypeValidation.assert.stringEqualOrGreater(param, minLength)
        }



    }
}