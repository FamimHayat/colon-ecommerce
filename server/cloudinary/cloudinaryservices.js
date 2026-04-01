const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (file, folder) => {
  const base64String = file.buffer.toString("base64");
  const fileUrl = `data:${file.mimetype};base64,${base64String}`;
  return await cloudinary.uploader.upload(fileUrl, { folder });
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
