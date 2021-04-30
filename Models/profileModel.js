const {Schema, model} = require('mongoose')
// const UserData = require('./userModel')
// const PostData = require('./postModel')

const profile = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'UserData',
      required: true
   },
   country: {
      type: String,
      required: true
   },
   bio: {
      type: String,
      required: true
   },
   socialLinks: {
      website: {type: String, trim: true},
      facebook: {type: String, trim: true},
      twitter: {type: String, trim: true},
      linkedin: {type: String, trim: true},
   },
   education: {
      degree: {type: String},
      institute: {type: String},
   },
   work: {
      position: {type: String},
      organization: {type: String},
   },
   posts: [
      {
         type: Schema.Types.ObjectId,
         ref: 'PostData',
      }
   ],
   bookmarks: [
      { 
         type: Schema.Types.ObjectId,
         ref: 'PostData',
      }
   ]
}, {timestamps: true})

const ProfileData = model('ProfileData', profile)
module.exports = ProfileData