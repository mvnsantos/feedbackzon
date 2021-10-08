this.ErrorCode = function()
{
    const errorCode =
    {
        DATABASE_ERROR: 1,
        REGISTER_NOT_FOUND: 2,
        DATABASE_RELANTIONSHIP_ERROR: 3,
        AUTH_ERROR: 4,
        VALIDATION_ERROR: 5,
        UNKNOWN: 999
    };

    return errorCode

}();

this.ErrorObj = function(code, message, exception)
{ 
    var obj = 
    {
        statusCode : code,
        error: exception,
        message: message
    }

    return obj;
}