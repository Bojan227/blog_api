const cloudinary = require('cloudinary').v2;


const uploadImage = async (img) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
  
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(img, options);
      return result.url;
    } catch (error) {
      console.error(error);
    }
  };

  module.exports = uploadImage