const UserData = require('../Models/userModel')

const follower = {
   path: 'follower',
   select: '_id username profilePic email createdAt'
}
const following = {
   path: 'following',
   select: '_id username profilePic email createdAt'
}

exports.followUnFollowUser = async (req, res, next) => {
   const {userId} = req.params
   try {
      const user = await UserData.findById(req.user._id)
      if (user.following.includes(userId)) {
         const followerUser = await UserData.findByIdAndUpdate(
            req.user._id,
            {$pull: {'following': userId}},
            {new: true}
         )
         const followingUser = await UserData.findByIdAndUpdate(
            userId,
            {$pull: {'follower': req.user._id}},
            {new: true}
         )

         if (followerUser && followingUser) {
            followerUser.password = undefined
            followingUser.password = undefined
            res.status(200).send({followerUser, followingUser})
         }
      } else {
         const followerUser = await UserData.findByIdAndUpdate(
            req.user._id,
            {$push: {'following': userId}},
            {new: true}
         )
         const followingUser = await UserData.findByIdAndUpdate(
            userId,
            {$push: {'follower': req.user._id}},
            {new: true}
         )

         if (followerUser && followingUser) {
            followerUser.password = undefined
            followingUser.password = undefined
            res.status(200).send({followerUser, followingUser})
         }
      }
   } catch (error) {
      res.send({error: 'Server Error, Please try again'})
   }
}