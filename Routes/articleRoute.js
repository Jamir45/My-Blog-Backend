const router = require('express').Router()
const checkSignInUser = require('../Middlewares/authMiddleware')
const upload = require('../Middlewares/uploadMiddleware')

const {
   uploadArticleImg, 
   uploadArticleThumbnail, 
   postArticle, 
   editArticle,
   deleteArticle,
   getAllArticle,
} = require('../Controllers/articleController')


router.post('/upload/postImage', checkSignInUser, upload.single('file'), uploadArticleImg)

router.post('/upload/post-thumbnail', checkSignInUser, upload.single('file'), uploadArticleThumbnail)

router.post('/post/article', checkSignInUser, postArticle)
router.put('/edit/article', checkSignInUser, editArticle)
router.delete('/delete/article/:postId', checkSignInUser, deleteArticle)

// get all article for all user
router.get('/get-all/article', getAllArticle)


module.exports = router