const cloudinary = require('../CloudinaryConfig/CloudinaryConfig')
const readingTime = require('reading-time');
const ArticleData = require('../Models/articleModel')
const UserData = require('../Models/userModel')

// upload article image 
exports.uploadArticleImg = async(req, res, next) => {
   const image = req.file
   try {
      const uploadedPostImg = await cloudinary.uploader.upload(image.path)
      if (uploadedPostImg) {
         res.send({postImgUrl: uploadedPostImg})
      }
   } catch (error) {
      res.status(500).send({error: 'Server Error, Please try again'})
   }
}

// upload article thumbnail image 
exports.uploadArticleThumbnail = async(req, res, next) => {
   const image = req.file
   try {
      const thumbnailUrl = await cloudinary.uploader.upload(image.path)
      if (thumbnailUrl) {
         res.send(thumbnailUrl)
      }
   } catch (error) {
      res.status(500).send({error: 'Server Error, Please try again'})
   }
}

// post article  
exports.postArticle = async(req, res, next) => {
   const {title, articleThumbnail, body, searchTags} = (req.body)
   const tags = searchTags.split(',')
   const readTime = readingTime(body).text

   try {
      const article = new ArticleData({
         title, 
         articleThumbnail, 
         body,
         author: req.user._id,
         tags,
         readTime,
         likes: [],
         dislikes: [],
         comments: [],
      })
      const createdArticle = await article.save()
      if (createdArticle) {
         const updatedUser = await UserData.findByIdAndUpdate(
            req.user._id, 
            {
               $push: {posts: createdArticle._id}
            }
         )
         res.send({createdArticle, updatedUser, success: 'Article Successfully Posted'})
      }
   } catch (error) {
      res.status(500).send({error: 'Server Error, Please try again'})
   }
}