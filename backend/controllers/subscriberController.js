import Subscriber from "../models/subscriberSchema.js";

export const subscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({
        success: false,
        message: "Email is allready subscribed",
      });
    }
    await Subscriber.create({ email });
    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to the newsletter",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
