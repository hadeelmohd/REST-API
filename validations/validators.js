const {body} = require('express-validator/check');

exports.hasDescription = body('description')
.isLength({min: 5})
.withMessage("Description is required. min length 5 characters");
    
exports.isEmail = body("email")
.isEmail()
.withMessage("email field must contain a correct email");

exports.hasPassword = body("password")
.exists()
.withMessage("password cannot be empty");

exports.hasName = body("name")
.isLength({ min: 5})
.withMessage("Name is required. min length 5 characters");