import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await getCart(userId, guestId);

    if (cart) {
      const index = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart,
      });
    }

    const newCart = await Cart.create({
      user: userId || undefined,
      guestId: userId ? undefined : guestId || `guest_${Date.now()}`,
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: product.price,
          size,
          color,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Cart created and item added",
      data: newCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity > 0) {
      cart.products[index].quantity = quantity;
    } else {
      cart.products.splice(index, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size, color, guestId, userId } = req.body;

    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.products.splice(index, 1);

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getCartDetails = async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const mergeGuestUser = async (req, res) => {
  try {
    const { guestId } = req.body;
    const userId = req.user._id;

    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: userId });

    if (guestCart && guestCart.products.length > 0) {

      if (userCart) {

        guestCart.products.forEach((guestItem) => {
          const index = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (index > -1) {
            userCart.products[index].quantity += guestItem.quantity;
          } else {
            userCart.products.push({
              productId: guestItem.productId,
              name: guestItem.name,
              image: guestItem.image,
              price: guestItem.price,
              size: guestItem.size,
              color: guestItem.color,
              quantity: guestItem.quantity,
            });
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();

        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json({
          success: true,
          message: "Cart merged successfully",
          data: userCart,
        });
      }

      // if user has NO cart → convert guest cart to user cart
      guestCart.user = userId;
      guestCart.guestId = undefined;

      await guestCart.save();

      return res.status(200).json({
        success: true,
        message: "Guest cart assigned to user",
        data: guestCart,
      });
    }

    if (userCart) {
      return res.status(200).json({
        success: true,
        message: "No guest cart, user cart returned",
        data: userCart,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No cart found",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
