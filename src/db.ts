// db.js
import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    let mongoHost;

    if (process.env.NODE_ENV === "production") {
      mongoHost = "localhost:27017";
    } else {
      mongoHost = "13.38.34.81:27018";
    }

    // Construct the MongoDB connection string
    const mongoURI = `mongodb://${mongoHost}/trustmen`;
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
