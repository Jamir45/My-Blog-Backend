const {Schema, model} = require('mongoose')
// const UserData = require('./userModel')
// const PostData = require('./postModel')

const comments = new Schema({
   post: {
      type: Schema.Types.ObjectId,
      ref: 'UserData',
      required: true,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'PostData',
      required: true,
   },
   body: {
      type: String,
      trim: true,
   },
   replies: [
      {
         body: { 
            type: String,
            trim: true,
         },
         user: {
            type: Schema.Types.ObjectId,
            ref: 'PostData',
            required: true,
         },
         commentAt: {
            type: Date,
            default: new Date()
         }
      }
   ]
}, {timestamps: true})

const CommentData = model('CommentData', comments)
module.exports = CommentData