function isUUID(uuid) {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
        return false;
    }
    return true;
}
function isUUIDAssert(uuid) {
    if(!isUUID(uuid)){
        throw new Error(`value(${uuid}) is not uuid`)
    }
}


function isNumeric(n){
    return (typeof n == "number" && !isNaN(n));
  }
function isNumericAssert(n){
    if(!isNumeric(n)){
        throw new Error(`value(${n}) is not numeric`)
    }
}
function isString(v){
    return typeof v == "string"
}
function isStringAssert(v){
    if(!isString(v)){
        throw new Error(`value(${v}) is not string`)
    }
}
function isEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function isEmailAssert(email) 
{
    if(!isEmail(email)){
        throw new Error(`value(${email}) is not email`)
    }
}
function stringEqualOrLess(str,len){
    isStringAssert(str)
    return str.length <= len
}
function stringEqualOrLessAssert(str,len){
    if(!stringEqualOrLess(str,len)){
        throw new Error(`value(${str}) length is not equal or less than ${len}`)

    }
}
function stringEqualOrGreater(str,len){
    isStringAssert(str)
    return str.length >= len
}
function stringEqualOrGreaterAssert(str,len){
    if(!stringEqualOrGreater(str,len)){
        throw new Error(`value(${str}) length is not equal or greater than ${len}`)

    }
}

function numberMaxValue(n,val){
    return n <=val
}
function numberMaxValueAssert(n,val){
    if(!numberMaxValue(n,val)){
        throw new Error(`value(${n}) is not equal or less than ${val}`)
    }
}
function numberMinValue(n,val){
    return n >= val
}
function numberMinValueAssert(n,val){
    if(!numberMinValue(n,val)){
        throw new Error(`value(${n}) is not equal or greater than ${val}`)
    }
}

module.exports = {
    isUUID,
    isNumeric,
    isString,
    isEmail,
    stringEqualOrLess,
    stringEqualOrGreater,
    numberMaxValue,
    numberMinValue,
    assert:{
        isString:isStringAssert,
        isNumeric:isNumericAssert,
        isUUID:isUUIDAssert,
        isEmail: isEmailAssert,
        stringEqualOrLess: stringEqualOrLessAssert,
        stringEqualOrGreater:stringEqualOrGreaterAssert,
        numberMaxValue: numberMaxValueAssert,
        numberMinValue: numberMinValueAssert

    }
}