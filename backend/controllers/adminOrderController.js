import mongoose from "mongoose";
import Order from "../models/orderSchema.js";

export const allOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("order", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: orders.length
        ? "orders fetched successfully"
        : "No orders found",
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const validStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (status) {
      order.status = status;

      if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
    }

    const updatedOrder = await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalide orderId",
      });
    }
    const order = await Order.findByIdAndDelete(id);
    if (order) {
      return res.status(200).json({
        success: true,
        message: "Order deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};