const router = require('express').Router()
const checkSignInUser = require('../Middlewares/authMiddleware')

const {likeArticle, dislikeArticle, bookmarkArticle} = require('../Controllers/LikeDislikeController')


router.put('/article/like/:articleId', checkSignInUser, likeArticle)
router.put('/article/dislike/:articleId', checkSignInUser, dislikeArticle)
router.put('/article/bookmark/:articleId', checkSignInUser, bookmarkArticle)


module.exports = router