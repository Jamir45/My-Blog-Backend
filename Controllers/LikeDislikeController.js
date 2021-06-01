const ArticleData = require('../Models/articleModel')
const UserData = require('../Models/userModel')

const author = {
   path: 'author',
   select: '_id username profilePic email createdAt'
}

// Like on the Article
exports.likeArticle = async (req, res, next) => {
   const {articleId} = req.params
   const article = await ArticleData.findById(articleId)
   if (article.dislikes.includes(req.user._id)) {
      await ArticleData.findByIdAndUpdate(
         articleId,
         {$pull: {'dislikes': req.user._id}},
         {new: true}
      ).populate(author)
   }
   try {
      if (article.likes.includes(req.user._id)) {
         const likedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'likes': req.user._id}},
            {new: true}
         ).populate(author)
         res.send(likedPost)
      } else {
         const likedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$push: {'likes': req.user._id}},
            {new: true}
         ).populate(author)
         res.send(likedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Dislike on the Article
exports.dislikeArticle = async (req, res, next) => {
   const {articleId} = req.params
   const article = await ArticleData.findById(articleId)
   if (article.likes.includes(req.user._id)) {
      await ArticleData.findByIdAndUpdate(
         articleId,
         {$pull: {'likes': req.user._id}},
         {new: true}
      ).populate(author)
   }
   try {
      if (article.dislikes.includes(req.user._id)) {
         const dislikedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'dislikes': req.user._id}},
            {new: true}
         ).populate(author)
         res.send(dislikedPost)
      } else {
         const dislikedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$push: {'dislikes': req.user._id}},
            {new: true}
         ).populate(author)
         res.send(dislikedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Dislike on the Article
exports.bookmarkArticle = async (req, res, next) => {
   const {articleId} = req.params
   console.log(articleId)
   try {
      const userProfile = await UserData.findById(req.user._id)
      if (userProfile.bookmarks.includes(articleId)) {
         const bookmarkedPost = await UserData.findByIdAndUpdate(
            req.user._id,
            {$pull: {'bookmarks': articleId}},
            {new: true}
         )
         res.send(bookmarkedPost)
         // console.log(bookmarkedPost)
      } else {
         const bookmarkedPost = await UserData.findByIdAndUpdate(
            req.user._id,
            {$push: {'bookmarks': articleId}},
            {new: true}
         )
         res.send(bookmarkedPost)
         // console.log(bookmarkedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}