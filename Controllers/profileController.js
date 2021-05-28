const cloudinary = require('../CloudinaryConfig/CloudinaryConfig')
const { validationResult } = require('express-validator');
const UserData = require('../Models/userModel')
const ProfileData = require('../Models/profileModel')


// Upload User Profile Image
exports.profileImgUpload = async (req, res) => {
   const image = req.file
   
   try {
      const uploadedImage = await cloudinary.uploader.upload(image.path)
      if (uploadedImage) {
         const updatedUserData = await UserData.findByIdAndUpdate(
            req.body.userId, 
            {
               $set:{profilePic:uploadedImage.secure_url}
            },
            {
               new:true
            }
         )
         res.send({updatedUserData, success: 'Profile Image Successfully Uploaded'})
      }
   } catch (e) {
      res.send({error: "Server Error, Please Try Again."})
   }
}

// Set User Profile Data
exports.setUserProfile = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const errorMsg = errors.formatWith((data) => data.msg).mapped()
      res.send(errorMsg)
   }
   const {country, name, bio, website, facebook, twitter, linkedin, degree, institute, position, organization} = req.body

   try {
      const setProfile = new ProfileData({
         user: req.user._id,
         country, 
         bio, 
         socialLinks: {
            website: website || '', 
            facebook: facebook || '', 
            twitter: twitter || '', 
            linkedin: linkedin || '', 
         },
         education: {
            degree, 
            institute, 
         },
         work: {
            position, 
            organization
         },
         posts: [],
         bookmarks: []
      })
      const savedProfile = await setProfile.save()
      if (savedProfile) {
         const loggedInUser = await UserData.findByIdAndUpdate(
            req.user._id,
            {
               $set: {
                  name: name,
                  profile: savedProfile._id
               }
            },
            {
               new:true
            }
         )
         const token = await jwt.sign(
            {
               userId: loggedInUser._id,
               username: loggedInUser.username,
               email: loggedInUser.email,
               profilePic: loggedInUser.profilePic,
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
         );

         res.send({savedProfile, token, success: "Your Profile is Successfully Saved"})
      }
   } catch (error) {
      console.log(req.user._id)
      res.send({error: "Server error, please try agin."})
   }
}


// Edit User Profile Data
exports.EditUserProfile = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const errorMsg = errors.formatWith((data) => data.msg).mapped()
      res.send(errorMsg)
   }
   const {country, name, bio, website, facebook, twitter, linkedin, degree, institute, position, organization} = req.body

   try {
      const savedProfile = await ProfileData.findOneAndUpdate(
         {user: req.user._id},
         {
            $set: {
               user: req.user._id,
               country, 
               bio, 
               socialLinks: {
                  website: website || '', 
                  facebook: facebook || '', 
                  twitter: twitter || '', 
                  linkedin: linkedin || '', 
               },
               education: {
                  degree, 
                  institute, 
               },
               work: {
                  position, 
                  organization
               },
               posts: [],
               bookmarks: []
            }
         },
         {new: true}
      )
      res.send({savedProfile, success: "Your Profile is Successfully Edited"})

   } catch (error) {
      console.log(req.user._id)
      res.send({error: "Server error, please try agin."})
   }
}

// Get User Data
exports.getUserProfile = async (req, res) => {
   try {
      const getUser = await ProfileData.findOne({user: req.user._id})
      res.send(getUser)
   } catch (error) {
      res.send({error: "Some thing was wrong, please try agin."})
   }
}

// Get All User Profile
exports.getAllUsersProfile = async (req, res, next) => {
   try {
      const allUserData = await ProfileData.find()
      res.send(allUserData)
   } catch (error) {
      res.status(404).json({error: 'Something was wrong.!'})
   }
}