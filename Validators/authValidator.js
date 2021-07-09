const { check } = require('express-validator');
const UserData = require('../Models/userModel')

// signup validator
exports.signupValidator = [
   check('username')
         .notEmpty().withMessage('Please provide your name.')
         ,
   check('email')
         .notEmpty().withMessage('Please provide an email.')
         .isEmail().withMessage('Please provide a valid email.')
         .custom( async (email) => {
            const user = await UserData.findOne({email})
            if (user) {
               throw new Error('Email is already used by another account')
            }else{
               return true
            }
         })
         ,
   check('gender')
         .notEmpty().withMessage('Please your gender')
         ,
   check('password')
         .notEmpty().withMessage('Please provide your password.')
         .custom( (password) => {
            if (password.length < 4 || password.length > 8) {
               throw new Error('Password must be between 4 tp 8 characters')
            }else{
               return true
            }
         })
         ,
   check('confirm_password')
         .notEmpty().withMessage('Please provide your confirm password.')
         .custom( (confirm_password, {req}) => {
            if (confirm_password !== req.body.password) {
               throw new Error('Confirm password is not match')
            }else{
               return true
            }
         })
]

// sign in validator
exports.signinValidator = [
   check('email')
         .notEmpty().withMessage('Please provide an email.')
         .isEmail().withMessage('Please provide a valid email.')
         ,
   check('password')
         .notEmpty().withMessage('Please provide your password.')
         ,
]

// sign in validator
exports.resetPasswordValidator = [
   check('email')
         .notEmpty().withMessage('Please provide an email.')
         .isEmail().withMessage('Please provide a valid email.')
         ,
]