const { uploadToCloudinary } = require("../cloudinary/cloudinaryservices");
const categorySchema = require("../models/categorySchema");

const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const thumbnail = req.file;

    if (!thumbnail)
      return res.status(400).send({ error: "thumbnail is required..!" });

    if (!name) return res.status(400).send({ error: "name is required..!" });
    if (!slug) return res.status(400).send({ error: "slug is required..!" });

    const existingCategory = await categorySchema.findOne({ slug });

    if (existingCategory)
      return res
        .status(400)
        .send({ error: "category under this name already exists..!" });

    const imageResponse = await uploadToCloudinary(
      thumbnail,
      "category-thumbnail"
    );
    const imageUrl = imageResponse.secure_url;

    const category = new categorySchema({
      name,
      slug,
      description,
      thumbnail: imageUrl,
    });

    category.save();

    res.status(201).send({ success: "a new category has been created..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `createCategory controller : from categoryControllers ${error.message}`
    );
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await categorySchema.find({});

    res.status(200).send({ success: "all categories", categories });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `getAllCategory controller : from categoryControllers ${error.message}`
    );
  }
};

module.exports = { createCategory, getAllCategory };
