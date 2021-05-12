const ArticleData = require('../Models/articleModel')
const UserData = require('../Models/userModel')


// Like on the Article
exports.likeArticle = async (req, res, next) => {
   const {articleId} = req.params
   try {
      const article = await ArticleData.findById(articleId)
      if (article.dislikes.includes(req.user._id)) {
         await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'dislikes': req.user._id}},
            {new: true}
         )
      }

      if (article.likes.includes(req.user._id)) {
         const likedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'likes': req.user._id}},
            {new: true}
         )
         res.send(likedPost)
      } else {
         const likedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$push: {'likes': req.user._id}},
            {new: true}
         )
         res.send(likedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Dislike on the Article
exports.dislikeArticle = async (req, res, next) => {
   const {articleId} = req.params
   try {
      const article = await ArticleData.findById(articleId)
      if (article.likes.includes(req.user._id)) {
         await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'likes': req.user._id}},
            {new: true}
         )
      }

      if (article.dislikes.includes(req.user._id)) {
         const dislikedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$pull: {'dislikes': req.user._id}},
            {new: true}
         )
         res.send(dislikedPost)
      } else {
         const dislikedPost = await ArticleData.findByIdAndUpdate(
            articleId,
            {$push: {'dislikes': req.user._id}},
            {new: true}
         )
         res.send(dislikedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Dislike on the Article
exports.bookmarkArticle = async (req, res, next) => {
   const {articleId} = req.params
   try {
      const userProfile = await UserData.findById(req.user._id)
      if (userProfile.bookmarks.includes(articleId)) {
         const bookmarkedPost = await UserData.findByIdAndUpdate(
            req.user._id,
            {$pull: {'bookmarks': articleId}},
            {new: true}
         ).populate({
            path: 'bookmarks'
         })
         res.send(bookmarkedPost)
      } else {
         const bookmarkedPost = await UserData.findByIdAndUpdate(
            req.user._id,
            {$push: {'bookmarks': articleId}},
            {new: true}
         ).populate({
            path: 'bookmarks'
         })
         res.send(bookmarkedPost)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}