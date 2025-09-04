import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("MONGO_URI:", process.env.MONGO_URI); // Debug line

  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
    });
};
