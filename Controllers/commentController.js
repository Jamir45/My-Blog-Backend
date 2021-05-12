const ArticleData = require('../Models/articleModel')
const CommentData = require('../Models/commentModel')

// Add Comment
exports.addComment = async (req, res) => {
   const {articleId} = req.params
   const {userComment} = req.body
   try {
      const comment = new CommentData({
         post: articleId,
         user: req.user._id,
         comment: userComment,
         replies: []
      })
      const savedComment = await comment.save()
      await ArticleData.findByIdAndUpdate(
         articleId,
         {
            $push: {'comments': savedComment._id}
         }
      )
      let commentJSON = await CommentData.findOne({
         _id: savedComment._id
      })
      .populate({
         path: 'user',
         select: 'username profilePic'
      })
      .populate({
         path: 'replies',  
         populate: {
            path: "user",
            select: 'username profilePic',
         }
      })
      res.status(200).send(commentJSON)
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Add Replay On Comment
exports.replayOnComment = async (req, res) => {
   const {commentId} = req.params
   const {replayBody} = req.body
   console.log(commentId, replayBody)
   try {
      const replay = {
         user: req.user._id,
         replay: replayBody,
      }
      if (commentId) {
         const commentReplay = await CommentData.findByIdAndUpdate(
            commentId,
            {
               $push: {'replies': {
                  user: req.user._id,
                  replay: replayBody,
               }}
            },
            {new : true},
         )
         .populate({
            path: 'user',
            select: 'username profilePic'
         })
         .populate({
            path: 'replies',  
            populate: {
               path: "user",
               select: 'username profilePic',
            }
         })
         // console.log(commentReplay)
         res.send(commentReplay)
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}

// Get All Comments
exports.getAllComments = async (req, res, next) => {
   try {
      const allComments = await CommentData.find()
      .populate({
         path: 'user',
         select: 'username profilePic',
      })
      .populate({
         path: 'replies',  
         populate: {
            path: "user",
            select: 'username profilePic',
         }
      })
      res.send(allComments)
   } catch (error) {
      res.status(500).send({error: 'Server Error, Please try again'})
   }
}