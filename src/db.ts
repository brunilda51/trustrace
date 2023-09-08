// db.ts

import mongoose, { ConnectOptions } from "mongoose";

const dbUrl = "mongodb://localhost:27017/your-database-name";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

database.once("open", () => {
  console.log("Connected to MongoDB");
});

export default database;
