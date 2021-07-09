const cloudinary = require('../CloudinaryConfig/CloudinaryConfig')

exports.PictureRemover = async (article) => {
   const {articleThumbnail, body} = article
   if (articleThumbnail) {
      const publicId = articleThumbnail.split('/')[7]
      const pbID = publicId.slice(0, publicId.length - 4)
      await cloudinary.uploader.destroy(pbID);
   }
   const $ = cheerio.load(body);
   const linkObjects = $('img');
   const links = [];
   linkObjects.each((index, element) => {
      const src = $(element).attr();
      const publicId = src.src.split('/')[7]
      const pbID = publicId.slice(0, publicId.length - 4)
      links.push(pbID);
   });
   if (links.length > 0) {
      await cloudinary.api.delete_resources(links);
   }
}