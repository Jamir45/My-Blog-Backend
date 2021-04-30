const {Schema, model} = require('mongoose')
// const UserData = require('./userModel')
// const CommentsData = require('./commentModel')

const article = new Schema({
   title: {
      type: String,
      required: true,
      trim: true,
   },
   articleThumbnail: {
      type: String,
      trim: true,
   },
   body: {
      type: String,
      required: true,
      trim: true,
   },
   author: {
      type: Schema.Types.ObjectId,
      ref: 'UserData',
      required: true
   },
   tags: [String],
   readTime: {
      type: String,
      trim: true,
   },
   likes: [
      {
         type: Schema.Types.ObjectId,
         ref: 'UserData',
      }
   ],
   dislikes: [
      {
         type: Schema.Types.ObjectId,
         ref: 'UserData',
      }
   ],
   comments: [
      {
         type: Schema.Types.ObjectId,
         ref: 'CommentsData'
      }
   ]
}, {timestamps: true})

const ArticleData = model('ArticleData', article);
module.exports = ArticleData;