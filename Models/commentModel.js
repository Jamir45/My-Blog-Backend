const {Schema, model} = require('mongoose')
// const UserData = require('./userModel')
// const PostData = require('./postModel')

const comments = new Schema({
   post: {
      type: Schema.Types.ObjectId,
      ref: 'PostData',
      required: true,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'UserData',
      required: true,
   },
   comment: {
      type: String,
      trim: true,
   },
   replies: [
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'UserData',
            required: true,
         },
         replay: { 
            type: String,
            trim: true,
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