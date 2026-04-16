import Product from "../models/productSchema.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    if (!name || !price || !sku || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const createdProduct = await Product.create({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.countInStock = countInStock ?? product.countInStock;
    product.sku = sku ?? product.sku;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.sizes = sizes ?? product.sizes;
    product.colors = colors ?? product.colors;
    product.collections = collections ?? product.collections;
    product.material = material ?? product.material;
    product.gender = gender ?? product.gender;
    product.images = images ?? product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.tags = tags ?? product.tags;
    product.dimensions = dimensions ?? product.dimensions;
    product.weight = weight ?? product.weight;

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getProduct = async (req, res) => {
//   try {
//     const {
//       collection,
//       size,
//       color,
//       gender,
//       minPrice,
//       maxPrice,
//       sortBy,
//       search,
//       category,
//       material,
//       brand,
//       limit,
//     } = req.query;

//     let query = {};
//     if (collection && collection.toLowerCase() !== "all") {
//       query.collection = collection;
//     }
//     if (category && category.toLowerCase() !== "all") {
//       query.category = category;
//     }
//     if (material) {
//       query.material = { $in: material.split(",") };
//     }
//     if (brand) {
//       query.brand = { $in: brand.split(",") };
//     }
//     if (size) {
//       query.sizes = { $in: size.split(",") };
//     }
//     if (color) {
//       query.colors = { $in: [color] };
//     }
//     if (gender) {
//       query.gender = gender;
//     }
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }
//     let sort = {};
//     if (sortBy) {
//       switch (sortBy) {
//         case "priceAsc":
//           sort = { price: 1 };
//           break;
//         case "priceDesc":
//           sort = { price: -1 };
//           break;
//         case "popularity":
//           sort = { rating: -1 };
//           break;
//         default:
//           break;
//       }
//     }

//     let products = await Product.find(query)
//       .sort(sort)
//       .limit(Number(limit) || 0);
//     return res.status(200).json({
//       success: true,
//       message: "Product get successfully",
//       data: products,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Server Error",
//     });
//   }
// };

export const getProduct = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = { createdAt: -1 };

    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;
      case "priceDesc":
        sort = { price: -1 };
        break;
      case "popularity":
        sort = { rating: -1 };
        break;
    }

    const limitNum = Number(limit) || 0;

    const products = await Product.find(query).sort(sort).limit(limitNum);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const productDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const similarProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      gender: product.gender,
      category: product.category,
    })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.status(200).json({
      success: true,
      message: "Similar products fetched successfully",
      data: similarProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const bestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ rating: -1 }).limit(4);

    if (bestSellers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No best sellers found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Best sellers fetched successfully",
      data: bestSellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
export const newArrivals = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 }) 
      .limit(8);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No new arrivals found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "New arrivals fetched successfully",
      data: products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
