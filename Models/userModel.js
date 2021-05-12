const {Schema, model} = require('mongoose')
// const ProfileData = require('./profileModel')

const user = new Schema({
   username: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
   },
   gender: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   profilePic: {
      type: String,
      default: 'https://res.cloudinary.com/dj7k9b8ps/image/upload/v1619071303/p1uf7vrckivcmiogwwwu.png',
   },
   profile: {
      type: Schema.Types.ObjectId,
      ref: 'ProfileData',
   },
   bookmarks: [{
      type: Schema.Types.ObjectId,
      ref: 'ArticleData',
   }],
   posts: [String]
}, {timestamps: true})

const UserData = model('UserData', user)
module.exports = UserData