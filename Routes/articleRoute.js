const router = require('express').Router()
const checkSignInUser = require('../Middlewares/authMiddleware')
const upload = require('../Middlewares/uploadMiddleware')

const {uploadArticleImg, uploadArticleThumbnail, postArticle} = require('../Controllers/articleController')


router.post('/upload/postImage', checkSignInUser, upload.single('file'), uploadArticleImg)

router.post('/upload/post-thumbnail', checkSignInUser, upload.single('file'), uploadArticleThumbnail)

router.post('/post/article', checkSignInUser, postArticle)


module.exports = router