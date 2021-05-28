const jwt = require('jsonwebtoken');
const UserData = require('../Models/userModel')
const cookie = require('js-cookie')

const checkSignInUser = async (req, res, next) => {
   const {authorization} = req.headers
   // console.log(authorization)
   if (authorization) {
      try {
         // Verify Token
         const verified = await jwt.verify(authorization, process.env.JWT_SECRET)

         // Verified User
         const verifiedUser = await UserData.findOne({_id: verified.userId})
         verifiedUser.password = undefined
         req.user = verifiedUser
         next()
      } catch (error) {
         res.send({error: 'You are not sign in user.'})
      }
   } else {
      res.send({error: 'You are not sign in user.'})
   }
}

module.exports = checkSignInUser;