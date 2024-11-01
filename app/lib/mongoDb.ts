import mongoose from "mongoose";

export const connectDb = async () => {
  const DB_URI = process.env.MONGODB_URI;

  if (DB_URI) {
    try {
      await mongoose.connect(DB_URI);
      console.log("DB connected");
    } catch (error) {
      console.log(error);
    }
  }
};
