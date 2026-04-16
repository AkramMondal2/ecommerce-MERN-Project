import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("MongoDb not connected", error);
    process.exit(1);
  }
};

export default connectdb;
