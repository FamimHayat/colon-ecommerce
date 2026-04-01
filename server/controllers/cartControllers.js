const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");
const { isValidId } = require("../utils/validations");

const addToCart = async (req, res) => {
  try {
    const { productId, sku, quantity } = req.body;

    if (!productId)
      return res.status(400).send({ error: "invalid request..!" });

    if (!sku) return res.status(400).send({ error: "invalid request..!" });

    if (!quantity) return res.status(400).send({ error: "invalid request..!" });

    const productData = await productSchema.findById(productId);
    const discountAmount =
      (productData.price * productData.discountPercentage) / 100;
    const discountPrice = productData.price - discountAmount;
    const subtotal = discountPrice * quantity;

    const existingCart = await cartSchema.findOne({ user: req.user._id });
    if (existingCart) {
      const alreadyExist = existingCart.items.some(
        (product) => product.sku == sku,
      );
      if (alreadyExist)
        return res
          .status(400)
          .send({ error: "product already exists in cart..!" });

      existingCart.items.push({
        product: productId,
        sku,
        quantity,
        subtotal,
      });

      existingCart.save();
      return res.status(200).send({ success: "product added to your cart..!" });
    } else {
      const cartData = new cartSchema({
        user: req.user._id,
        items: [
          {
            product: productId,
            sku,
            quantity,
            subtotal,
          },
        ],
      });

      cartData.save();
    }

    res.status(200).send({ success: "product added to your cart..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `cartController controller : from cartControllers ${error.message} `,
    );
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await cartSchema
      .findOne({ user: req.user._id })
      .select("-user");
    res.status(200).send({ success: "", cart });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `getUserCart controller : from cartControllers ${error.message} `,
    );
  }
};
const updateCart = async (req, res) => {
  try {
    const { productId, itemId, newQuantity } = req.body;

    if (!isValidId([productId, itemId]))
      return res.status(400).send({ error: "invalid request..!" });

    if (!productId || !itemId || !newQuantity) {
      return res.status(400).send({ error: "invalid request..!" });
    }

    if (newQuantity < 1) {
      return res
        .status(400)
        .send({ error: "minimum 1 product is required..!" });
    }

    const productData = await productSchema.findById(productId);
    const discountAmount =
      (productData.price * productData.discountPercentage) / 100;
    const discountedPrice = productData.price - discountAmount;
    const subtotal = discountedPrice * newQuantity;

    const cart = await cartSchema
      .findOneAndUpdate(
        {
          user: req.user._id,
          "items._id": itemId,
        },
        {
          $set: {
            "items.$.quantity": newQuantity,
            "items.$.subtotal": subtotal,
          },
        },
        { new: true },
      )
      .select("items totalItems");

    if (!cart) {
      return res.status(404).send({ error: "cart/item not found..!" });
    }

    await cart.save();

    res.status(200).send({
      success: "cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(
      `updateCart controller : from cartControllers ${error.message}`,
    );
    res.status(500).send({ error: "500 || internal server error..!" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).send({ error: "invalid request..!" });
    }

    const cart = await cartSchema.findOneAndUpdate(
      {
        user: req.user._id,
        "items._id": itemId,
      },
      {
        $pull: { items: { _id: itemId } },
      },
      {
        new: true,
      },
    );

    if (!cart) {
      return res.status(404).send({ error: "cart/item not found..!" });
    }

    // ✅ IMPORTANT: recalculate totals (middleware won't run automatically)
    cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();

    res.status(200).send({
      success: "item removed from cart",
      cart,
    });
  } catch (error) {
    console.log(
      `removeFromCart controller : from cartControllers ${error.message}`,
    );

    res.status(500).send({ error: "500 || internal server error..!" });
  }
};

module.exports = { addToCart, getUserCart, updateCart, removeFromCart };
