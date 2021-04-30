const { check } = require('express-validator');
const validator = require('validator');


const urlValidator = value => {
   if (value) {
      if (!validator.isURL(value)) {
         throw new Error('Please Provide Valid URL')
      }
   }
   return true;
}

exports.profileValidator = [
   check('country')
      .notEmpty().withMessage('Please Provide Your Country Name.')
      ,
   check('bio')
      .notEmpty().withMessage('Please Provide Your Short Bio')
      .isLength({max: 250}).withMessage('Bio Length Must Be Below 250 characters')
      ,
   check('website')
      .custom(urlValidator)
      ,
   check('facebook')
      .custom(urlValidator)
      ,
   check('twitter')
      .custom(urlValidator)
      ,
   check('linkedin')
      .custom(urlValidator)
      ,
   check('degree')
      .isLength({max: 250}).withMessage('Degree Length Must Be Below 50 characters')
      ,
   check('institute')
      .isLength({max: 250}).withMessage('Institute Length Must Be Below 80 characters')
      ,
   check('position')
      .isLength({max: 250}).withMessage('Position Length Must Be Below 50 characters')
      ,
   check('organization')
      .isLength({max: 250}).withMessage('Organization Length Must Be Below 80 characters')
      ,
]