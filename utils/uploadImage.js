const cloudinary = require('cloudinary').v2;

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: "boki2435"
};

const uploadImage = async (img) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
   
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(img, options);
      return {imgUrl: result.url, img_id: result.public_id};
    } catch (error) {
      console.error(error);
    }
  };


  const deleteImage = async (imgId) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    
    try {
      // Delete the image
      const result = await cloudinary.uploader.destroy(imgId, options);
      return {imgUrl: result.url, img_id: result.public_id};
    } catch (error) {
      console.error(error);
    }
  };

  module.exports = {uploadImage, deleteImage}