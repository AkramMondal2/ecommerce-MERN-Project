import mongoose from "mongoose";
import dotenv from "dotenv/config.js";
import Product from "./models/productSchema.js";
import User from "./models/userSchema.js";
import products from "./data/products.js";

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.create({
      name: "Admin user",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userId = createUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfuly");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data", error);
    process.exit(1);
  }
};

seedData();
