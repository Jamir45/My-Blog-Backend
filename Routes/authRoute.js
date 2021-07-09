const router = require('express').Router()

const { 
   signUp, 
   signIn, 
   signOut, 
   getUser, 
   getAllUsers,
   resetPassword,
   setNewPassword,
   accountActivation
} = require('../Controllers/authController')
const {
   signupValidator, 
   signinValidator,
   resetPasswordValidator
} = require('../Validators/authValidator')
const checkSignInUser = require('../Middlewares/authMiddleware')

// User Sign Up Route
router.post('/signup', signupValidator, signUp)

// Account Activation Route
router.post('/activation', accountActivation)

// Reset password Route
router.post('/reset/password', resetPasswordValidator, resetPassword)

// Set new password Route
router.put('/set/password', setNewPassword)

// User Sign In Route
router.post('/signin', signinValidator, signIn)

// Get Signed In User
router.get('/get/data', checkSignInUser, getUser)

// Get All User Data
router.get('/get/all-users', getAllUsers)

// User Log Out Route
router.post('/signout', signOut)

module.exports = router