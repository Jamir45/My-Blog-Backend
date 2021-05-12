const router = require('express').Router()
const checkSignInUser = require('../Middlewares/authMiddleware')
const {
   addComment, 
   getAllComments, 
   replayOnComment
} = require('../Controllers/commentController')


router.post('/comment/write/:articleId', checkSignInUser, addComment)
router.put('/comment/replay/:commentId', checkSignInUser, replayOnComment)
router.get('/comment/get-all', getAllComments)


module.exports = router