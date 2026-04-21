import Checkout from "../models/checkoutSchema.js";
import Order from "../models/orderSchema.js";
import Cart from "../models/cartSchema.js";

export const newCheckout = async (req, res) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in checkout",
      });
    }

    const totalPrice = checkoutItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const checkout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log(`Checkout created for user: ${req.user._id}`);

    return res.status(201).json({
      success: true,
      message: "Checkout created successfully",
      data: checkout,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const pay = async (req, res) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;

    const checkout = await Checkout.findOne({ user: req.user._id });

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }

    if (paymentStatus?.toLowerCase() === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = "Paid";
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = new Date();

      await checkout.save();

      return res.status(200).json({
        success: true,
        message: "Payment successful",
        data: checkout,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment failed or invalid status",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const finalize = async (req, res) => {
  try {
    const { id } = req.params;

    const checkout = await Checkout.findById(id);

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({
        success: false,
        message: "Checkout already finalized",
      });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Checkout is not paid",
      });
    }

    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems, 
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "Paid",
      paymentDetails: checkout.paymentDetails,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = new Date();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
