const router = require('express').Router()
const checkSignInUser = require('../Middlewares/authMiddleware')

const {followUnFollowUser} = require('../Controllers/followUnfollowController')

// Follow Route
router.put('/user/followUnFollow/:userId', checkSignInUser, followUnFollowUser)

module.exports = router