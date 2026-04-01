const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../cloudinary/cloudinaryservices");
const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { size_variation } = require("../utils/services");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
    } = req.body;

    const thumbnail = req.files?.thumbnail;
    const imageGallery = req.files?.imageGallery;

    if (!title)
      return res.status(400).send({ error: "product title is required..!" });
    if (!slug)
      return res.status(400).send({ error: "product slug is required..!" });
    const isExistSlug = await productSchema.findOne({
      slug: slug.toLowerCase(),
    });
    if (isExistSlug)
      return res.status(400).send({ error: "slug already exist..!" });
    if (!description)
      return res
        .status(400)
        .send({ error: "product description is required..!" });
    if (!category)
      return res.status(400).send({ error: "product category is required..!" });
    const isExistCategory = await categorySchema.findById(category);
    if (!isExistCategory)
      return res
        .status(400)
        .send({ error: "product category does not exist..!" });
    if (!price)
      return res.status(400).send({ error: "product price is required..!" });

    const parsedVariants = JSON.parse(variants);

    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0)
      return res
        .status(400)
        .send({ error: "minimum 1 product variant is required..!" });

    for (const variant of parsedVariants) {
      console.log(variant);
      if (!variant.sku)
        return res.status(400).send({ error: "product sku is required..!" });
      if (!variant.color)
        return res
          .status(400)
          .send({ error: "color variation is required..!" });
      if (!variant.size)
        return res.status(400).send({ error: "size variation is required..!" });
      if (!size_variation.includes(variant.size))
        return res.status(400).send({ error: "invalid size..!" });
      if (!variant.stock || variant.stock < 1)
        return res
          .status(400)
          .send({ error: "product stock amount is required..!" });
    }

    const skuSet = parsedVariants.map((items) => items.sku);

    if (new Set(skuSet).size !== skuSet.length)
      return res.status(400).send({ error: "product sku must be unique..!" });

    if (!thumbnail || thumbnail.length === 0)
      return res
        .status(400)
        .send({ error: "product thumbnail is required..!" });

    const thumbnailResponse = await uploadToCloudinary(
      thumbnail[0],
      "product-thumbnail",
    );
    const thumbnailUrl = thumbnailResponse.secure_url;

    if (imageGallery && imageGallery.length > 4)
      return res
        .status(400)
        .send({ error: "maximum 4 images can be uploaded..!" });

    const imageUrls = [];
    if (imageGallery) {
      for (const item of imageGallery) {
        const imageUrl = await uploadToCloudinary(item, "product_gallery");
        imageUrls.push(imageUrl.secure_url);
      }
    }

    const newProduct = new productSchema({
      title,
      slug,
      description,
      category,
      price,
      discountPercentage,
      variants: parsedVariants,
      tags,
      thumbnail: thumbnailUrl,
      images: imageUrls,
      isActive,
      //isActive: true
    });

    await newProduct.save();

    res
      .status(201)
      .send({ success: "a new product has been uploaded successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `createProduct controller : from productControllers ${error.message} `,
    );
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category;
    const skip = (page - 1) * limit;

    const totalProducts = await productSchema.countDocuments();
    console.log(totalProducts);

    const pipeline = [
      //isActive: true
      {
        $match: { isActive: false },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    if (category) {
      pipeline.push({
        $match: { "category.slug": category },
      });
    }
    if (search) {
      pipeline.push({
        $match: {
          title: {
            $regex: search,
            $options: "i",
          },
        },
      });
    }

    const productList = await productSchema.aggregate(pipeline);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).send({
      success: "",
      productList,
      pagination: {
        page,
        limit,
        total: totalProducts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `getAllProducts controller : from productControllers ${error.message} `,
    );
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { slug } = req.params;

    // isActive : true
    const productDetails = await productSchema
      .findOne({ slug, isActive: false })
      .populate("category", "name")
      .select("-updatedAt");
    if (!productDetails)
      return res.status(404).send({ success: "product not found..!" });
    res.status(200).send({ success: "", productData: productDetails });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `getProductDetails controller : from productControllers ${error.message} `,
    );
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
      destroyImages = [],
    } = req.body;

    const { slug } = req.params;

    const thumbnail = req.files?.thumbnail;
    const imageGallery = req.files?.imageGallery;

    const productData = await productSchema.findOne({ slug });

    if (title) productData.title = title;
    if (description) productData.description = description;
    if (category) productData.category = category;
    if (price) productData.price = price;
    if (discountPercentage) productData.discountPercentage = discountPercentage;
    if (tags && tags?.length > 1 && Array.isArray(tags))
      productData.tags = tags;
    // isActive isActive === "true"
    if (isActive) productData.isActive = isActive === "false";

    const parsedVariants = variants && JSON.parse(variants);

    if (!Array.isArray(parsedVariants) && parsedVariants.length > 0) {
      for (const variant of parsedVariants) {
        console.log(variant);
        if (!variant.sku)
          return res.status(400).send({ error: "product sku is required..!" });
        if (!variant.color)
          return res
            .status(400)
            .send({ error: "color variation is required..!" });
        if (!variant.size)
          return res
            .status(400)
            .send({ error: "size variation is required..!" });
        if (!size_variation.includes(variant.size))
          return res.status(400).send({ error: "invalid size..!" });
        if (!variant.stock || variant.stock < 1)
          return res
            .status(400)
            .send({ error: "product stock amount is required..!" });
      }
      const skuSet = parsedVariants.map((items) => items.sku);

      if (new Set(skuSet).size !== skuSet.length)
        return res.status(400).send({ error: "product sku must be unique..!" });
      productData.variants = parsedVariants;
    }
    // observation
    if (thumbnail) {
      const imageResponse = await uploadToCloudinary(
        thumbnail[0],
        "product-thumbnail",
      );

      const publicId = productData.thumbnail.split("/").pop().split(".")[0];
      deleteFromCloudinary(`product-thumbnail/${publicId}`);

      productData.thumbnail = imageResponse?.secure_url;
    }

    let imageUrls = [];

    const totalImages =
      productData.images.length - destroyImages.length + imageGallery.length;
    if (totalImages > 4)
      return res
        .status(400)
        .send({ error: "maximum 4 images can be uploaded..!" });
    if (totalImages < 1)
      return res
        .status(400)
        .send({ error: "minimum 1 image should be uploaded..!" });

    if (imageGallery) {
      const resPromise = imageGallery.map(async (item) =>
        uploadToCloudinary(item, "product_gallery"),
      );
      const results = await Promise.all(resPromise);
      imageUrls = results.map((r) => r.secure_url);
    }

    if (Array.isArray(destroyImages) && destroyImages.length > 0) {
      for (const url of destroyImages) {
        const publicId = url.split("/").pop().split(".")[0];
        deleteFromCloudinary(`product-thumbnail/${publicId}`);
      }
    }

    let filteredImages = productData.images.filter((item) => {
      return !destroyImages.includes(item);
    });
    imageUrls = imageUrls.concat(filteredImages);

    if (imageUrls.length > 0) productData.images = imageUrls;
    productData.save();
    // observation

    res.status(200).send({ success: "product updated  successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `updateProduct controller : from productControllers ${error.message} `,
    );
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};
