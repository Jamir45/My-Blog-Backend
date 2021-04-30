const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname)
   }
})


const upload = multer({
   storage,
   limit:{
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: (req, file, cb) => {
      const types = /jpeg|jpg|png|gif/
      const extName = types.test(path.extname(file.originalname).toLowerCase())
      const mimeType = types.test(file.mimetype)
      
      if (extName && mimeType) {
         cb(null, true)
      } else {
         cb(new Error('Only support Image'))
      }
   }
})

module.exports = upload;