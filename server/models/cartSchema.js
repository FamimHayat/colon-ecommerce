const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },

  price: {
    type: Number,
    // required: true, // price snapshot
  },

  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);

  this.totalPrice = this.items.reduce((acc, item) => acc + item.subtotal, 0);
});

module.exports = mongoose.model("Cart", cartSchema);
