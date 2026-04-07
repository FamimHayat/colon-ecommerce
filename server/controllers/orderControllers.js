const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const stripe = require("stripe")(`${process.env.STRIPE_API_KEY}`);
const endpointSecret = `${process.env.WEBHOOK_SECRET_ENDPOINT}`;

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
      line_items: cartData.items.map((item) => ({
        price_data: {
          currency: "BDT",
          product_data: {
            name: item.sku,
            description: `SKU: ${item.sku}`,
          },
          unit_amount: (item.subtotal / item.quantity) * 100,
        },
        quantity: item.quantity,
      })),
      customer_email: req.user.email,
      metadata: {
        orderId: orderData._id.toString(),
      },
      success_url: `https://example.com/success`,
      cancel_url: `https://example.com/error`,
    });
    console.log(session.url);
    res.redirect(303, session.url);

    // online-payment ???
    res.status(200).send({ success: "order placed successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `checkout controller : from orderControllers ${error.message} `,
    );
  }
};

const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(event);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const updatedOrder = await orderSchema.findByIdAndUpdate(
        session.metadata.orderId,
        { "payment.status": "paid" },
        { returnDocument: "after" },
      );

      console.log("ORDER ID:", session.metadata.orderId);
      console.log("UPDATED ORDER:", updatedOrder);
    } catch (error) {
      console.log("DB Error:", error.message);
      return res.status(500).send("Database error");
    }
  }

  res.send();
};

module.exports = { checkout, webhook };
