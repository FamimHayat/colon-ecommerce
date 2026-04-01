const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const stripe = require("stripe")(`${process.env.STRIPE_API_KEY}`);

const checkout = async (req, res) => {
  try {
    const { paymentType, cartId, shippingAddress, insideDhaka } = req.body;
    const orderNumber = `TRX-${Date.now()}`;

    if (!paymentType)
      return res.status(400).send({ error: "invalid request..!" });
    if (!shippingAddress)
      return res.status(400).send({ error: "invalid request..!" });
    if (!insideDhaka)
      return res.status(400).send({ error: "invalid request..!" });

    if (!cartId) return res.status(400).send({ error: "1invalid request..!" });
    const cartData = await cartSchema.findOne({ _id: cartId });

    if (!cartData)
      return res.status(400).send({ error: "2invalid request..!" });
    const charge = insideDhaka === "true" ? 80 : 120;

    const totalPrice = cartData.items.reduce((total, current) => {
      return (total += current.subtotal);
    }, charge);

    const orderData = new orderSchema({
      user: req.user._id,
      items: cartData.items,
      shippingAddress,
      insideDhaka,
      deliveryCharge: charge,
      totalPrice,
      payment: { method: paymentType },
      orderNumber,
    });
    orderData.save();

    if (paymentType === "COD") {
      return res.status(200).send({ success: "order placed successfully..!" });
    }

    // online-payment ???

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: "T-Shirt",
              description: `Blue T-Shirt with chest print`,
            },
            unit_amount: 5000 * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: `${req.user.email}`,
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });

    res.redirect(303, session.url);
    console.log(session.url);

    // online-payment ???
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `checkout controller : from orderControllers ${error.message} `,
    );
  }
};

module.exports = { checkout };
