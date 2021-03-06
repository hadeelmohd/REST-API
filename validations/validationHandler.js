const {validationResult} = require('express-validator/check');

module.exports = req => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422; //we are not setting proper data
        error.validation = validationErrors.array();
        throw error;
    }
}