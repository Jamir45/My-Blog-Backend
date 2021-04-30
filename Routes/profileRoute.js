const router = require('express').Router()
const upload = require('../Middlewares/uploadMiddleware')
const cloudinary = require('../CloudinaryConfig/CloudinaryConfig')
const checkSignInUser = require('../Middlewares/authMiddleware')
const UserData = require('../Models/userModel')

const {
   profileImgUpload, 
   getUserProfile,
   setUserProfile
} = require('../Controllers/profileController')
const {profileValidator} = require('../Validators/profileValidator')

// get user profile data
router.get('/profile/get', checkSignInUser, getUserProfile)

// upload single image
router.put('/profile/image/upload', upload.single('file') , profileImgUpload)

// set user profile
router.post('/profile/set', checkSignInUser, profileValidator, setUserProfile)



// upload multiple images
router.post('/images/upload', upload.array('files') , async (req, res) => {
   const images = req.files

   try {
      const uploadedImages = []
      for (let i = 0; i < images.length; i++) {
         const element = images[i];
         const uploaded = await cloudinary.uploader.upload(element.path)
         uploadedImages.push(uploaded.secure_url)
      }
      if (uploadedImages) {
         console.log(uploadedImages)
         res.send({uploadedImages, success: 'Multiple Files Successfully Uploaded'})
      }
   } catch (e) {
      res.send({error: "Some thing was wrong"})
   }
})

module.exports = router